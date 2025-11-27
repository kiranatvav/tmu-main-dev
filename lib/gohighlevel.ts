/**
 * GoHighLevel API Integration
 *
 * API Version: 2021-07-28
 * Endpoint: https://services.leadconnectorhq.com
 * Documentation: https://highlevel.stoplight.io/docs/integrations/
 */

import { parsePhoneNumberFromString } from "libphonenumber-js";

// GoHighLevel API Configuration
export const GHL_CONFIG = {
  apiVersion: "2021-07-28",
  baseUrl: "https://services.leadconnectorhq.com",
  endpoints: {
    contacts: "/contacts/",
    contactsUpsert: "/contacts/upsert",
    opportunities: "/opportunities/",
    calendars: "/calendars/",
  },
} as const;

// Types
export interface GHLContact {
  name: string;
  email: string;
  phone?: string;
  locationId: string;
}

export interface GHLContactResponse {
  contact: {
    id: string;
    dateAdded: string;
    dateUpdated: string;
    email: string;
    phone?: string;
    firstName: string;
    locationId: string;
    [key: string]: unknown;
  };
  traceId: string;
}

/**
 * Upsert (create or update) a contact in GoHighLevel using the built-in upsert endpoint
 *
 * @param contact - Contact information
 * @param apiKey - GoHighLevel API key (Bearer token)
 * @returns Response from GoHighLevel API
 */
export async function upsertGHLContact(
  contact: GHLContact,
  apiKey: string
): Promise<{ success: boolean; data?: GHLContactResponse; error?: string }> {
  try {
    let normalizedPhone: string | undefined;
    if (contact.phone) {
      const parsed = parsePhoneNumberFromString(contact.phone || "");
      if (parsed && parsed.isValid()) {
        normalizedPhone = parsed.format("E.164");
      } else {
        normalizedPhone = undefined;
      }
    }

    const contactData: Record<string, unknown> = {
      name: contact.name,
      email: contact.email,
      locationId: contact.locationId,
    };

    if (normalizedPhone) {
      contactData.phone = normalizedPhone;
    }

    // Use GHL's built-in upsert endpoint
    const response = await fetch(
      `${GHL_CONFIG.baseUrl}${GHL_CONFIG.endpoints.contactsUpsert}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          Version: GHL_CONFIG.apiVersion,
        },
        body: JSON.stringify(contactData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `GHL ${response.status} ${response.statusText}: ${errorText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Create or update a contact in GoHighLevel
 * @deprecated Use upsertGHLContact instead
 */
export const createGHLContact = upsertGHLContact;

/**
 * Get GoHighLevel credentials from environment variables
 */
export function getGHLCredentials() {
  return {
    apiKey: process.env.GH_API_KEY || "",
    locationId: process.env.GHL_LOCATION_ID || "",
  };
}

/**
 * Check if GoHighLevel is properly configured
 */
export function isGHLConfigured(): boolean {
  const { apiKey, locationId } = getGHLCredentials();
  return Boolean(apiKey && locationId);
}
