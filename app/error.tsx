"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d0d]">
      <h2 className="text-xl font-semibold text-white mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-400 mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-xl px-6 py-3 text-black font-medium"
        style={{
          background: "#00ff05",
        }}
      >
        Try again
      </button>
    </div>
  );
}
