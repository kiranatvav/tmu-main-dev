"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog
    posthog.init("phc_l41E46ASDSFCDXL6ovoBQdqu74nxmIVFgp5ZiO1evWd", {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // We'll handle this manually for better control
      capture_pageleave: true,

      // Session Replay Configuration
      session_recording: {
        maskAllInputs: true, // Mask sensitive form inputs (emails, passwords)
        maskTextSelector: "[data-private]", // Mask elements with data-private attribute
        recordCrossOriginIframes: false, // Don't record iframes (like GHL calendar)
      },

      // Performance and privacy settings
      autocapture: {
        dom_event_allowlist: ["click", "submit"], // Only capture clicks and form submits
        element_allowlist: ["button", "a"], // Only capture button and link clicks
      },

      loaded: (_posthog) => {
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog initialized with Session Replay");
        }
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
