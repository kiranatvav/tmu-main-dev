import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import {
  upsertGHLContact,
  getGHLCredentials,
  isGHLConfigured,
} from "@/lib/gohighlevel";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Add breadcrumb for debugging
    Sentry.addBreadcrumb({
      category: "api",
      message: "Lead submission received",
      level: "info",
      data: { hasName: !!name, hasEmail: !!email, hasPhone: !!phone },
    });

    // Validate required fields
    if (!name || !email) {
      Sentry.captureMessage("Lead validation failed - missing fields", {
        level: "warning",
        extra: { hasName: !!name, hasEmail: !!email },
      });
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Set user context for Sentry
    Sentry.setUser({ email });

    // DEV_MODE: Skip GoHighLevel integration for development/testing
    const devMode = process.env.DEV_MODE === "true";

    if (devMode) {
      console.log("DEV_MODE enabled - Skipping GoHighLevel integration");
      console.log("Lead data:", { name, email, phone });

      Sentry.addBreadcrumb({
        category: "api",
        message: "DEV_MODE - skipping GHL integration",
        level: "info",
      });

      return NextResponse.json(
        {
          success: true,
          data: {
            id: "dev-mode-id",
            name: name,
            email: email,
            phone: phone,
            createdAt: new Date().toISOString(),
          },
          devMode: true,
        },
        { status: 201 }
      );
    }

    // Check if GoHighLevel is configured
    if (!isGHLConfigured()) {
      console.error("GoHighLevel credentials not configured");
      Sentry.captureMessage("GoHighLevel not configured", {
        level: "error",
        extra: {
          hasApiKey: !!process.env.GH_API_KEY,
          hasLocationId: !!process.env.GHL_LOCATION_ID,
        },
      });
      return NextResponse.json(
        { error: "Service not configured properly" },
        { status: 500 }
      );
    }

    // Upsert contact in GoHighLevel (create or update if exists)
    const { apiKey, locationId } = getGHLCredentials();
    const ghlResult = await upsertGHLContact(
      {
        name,
        email,
        phone,
        locationId,
      },
      apiKey
    );

    if (!ghlResult.success) {
      console.error("GoHighLevel API error:", ghlResult.error);
      Sentry.captureMessage("GoHighLevel API error", {
        level: "error",
        extra: { error: ghlResult.error, email },
      });
      return NextResponse.json(
        { error: ghlResult.error || "Failed to upsert contact" },
        { status: 400 }
      );
    }

    console.log("Successfully upserted contact in GoHighLevel");
    Sentry.addBreadcrumb({
      category: "api",
      message: "Lead successfully created in GoHighLevel",
      level: "info",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: ghlResult.data?.contact.id,
          name: name,
          email: email,
          phone: phone,
          createdAt: ghlResult.data?.contact.dateAdded,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    Sentry.captureException(error, {
      tags: { api: "leads", method: "POST" },
    });

    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
