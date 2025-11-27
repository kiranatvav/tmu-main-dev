"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

interface RouteProtectionProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const RouteProtection = ({
  children,
  redirectTo = "/",
}: RouteProtectionProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has submitted the lead form
    const checkAuthorization = () => {
      try {
        const leadData = localStorage.getItem("tmu_movie_lead");

        if (!leadData) {
          console.warn(
            "[RouteProtection] No lead data in localStorage - user may not have completed form"
          );
          Sentry.addBreadcrumb({
            category: "auth",
            message: "No lead data found in localStorage",
            level: "warning",
          });
          router.replace(redirectTo);
          return;
        }

        // Separate try-catch for JSON parsing to differentiate errors
        let parsed;
        try {
          parsed = JSON.parse(leadData);
        } catch (parseError) {
          console.error(
            "[RouteProtection] Corrupted localStorage data, clearing:",
            parseError
          );
          Sentry.captureException(parseError, {
            tags: { component: "route-protection", action: "json-parse" },
            extra: { leadDataLength: leadData.length },
          });
          localStorage.removeItem("tmu_movie_lead");
          router.replace(redirectTo);
          return;
        }

        if (!parsed.name || !parsed.email) {
          console.warn("[RouteProtection] Incomplete lead data:", {
            hasName: !!parsed.name,
            hasEmail: !!parsed.email,
          });
          Sentry.addBreadcrumb({
            category: "auth",
            message: "Incomplete lead data - missing name or email",
            level: "warning",
            data: { hasName: !!parsed.name, hasEmail: !!parsed.email },
          });
          localStorage.removeItem("tmu_movie_lead");
          router.replace(redirectTo);
          return;
        }

        console.debug(
          "[RouteProtection] Authorization successful for:",
          parsed.email
        );
        setIsAuthorized(true);
      } catch (error) {
        console.error(
          "[RouteProtection] Unexpected error checking authorization:",
          error
        );
        Sentry.captureException(error, {
          tags: { component: "route-protection", action: "check-auth" },
        });
        router.replace(redirectTo);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthorization();
  }, [router, redirectTo]);

  // Show nothing while checking to prevent flash of unauthorized content
  if (isChecking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div
          className="text-white text-lg"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;
};
