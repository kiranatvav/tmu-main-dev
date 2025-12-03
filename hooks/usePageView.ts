"use client";

import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

interface PageViewOptions {
  pageName: string;
  pagePath: string;
  additionalProperties?: Record<string, unknown>;
}

export function usePageView({
  pageName,
  pagePath,
  additionalProperties = {},
}: PageViewOptions) {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      posthog.capture("page_viewed", {
        page_name: pageName,
        page_path: pagePath,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        ...additionalProperties,
      });
    }
  }, [posthog, pageName, pagePath, additionalProperties]);
}
