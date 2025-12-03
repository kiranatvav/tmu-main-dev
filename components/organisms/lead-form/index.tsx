"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";
import { usePostHog } from "posthog-js/react";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { FormContainer } from "@/components/organisms/form-container";

export const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const posthog = usePostHog();

  // Track form viewed
  useEffect(() => {
    if (posthog) {
      posthog.capture("form_viewed");
    }
  }, [posthog]);

  const nameValid = !!formData.name.trim();
  const emailValid = (() => {
    if (!formData.email.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email.trim());
  })();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Track form submission attempt
    if (posthog) {
      posthog.capture("form_submitted", {
        fields_filled: [
          formData.name ? "name" : null,
          formData.email ? "email" : null,
        ].filter(Boolean).length,
      });
    }

    // Client-side validation - keep as inline errors
    if (!nameValid) {
      setError("Please enter your name");
      setIsSubmitting(false);
      if (posthog) {
        posthog.capture("form_submit_error", {
          error: "validation_failed",
          field: "name",
        });
      }
      return;
    }

    if (!emailValid) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      if (posthog) {
        posthog.capture("form_submit_error", {
          error: "validation_failed",
          field: "email",
        });
      }
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      });

      // Safe JSON parsing - handle malformed responses
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        Sentry.captureException(parseError, {
          tags: { form: "lead-form", action: "json-parse" },
          extra: { status: response.status, statusText: response.statusText },
        });
        throw new Error(
          "Server returned an invalid response. Please try again."
        );
      }

      if (!response.ok) {
        Sentry.captureMessage("Lead form submission failed", {
          level: "warning",
          extra: { status: response.status, error: data.error },
        });
        if (posthog) {
          posthog.capture("form_submit_error", {
            error: "api_error",
            status: response.status,
            message: data.error,
          });
        }
        throw new Error(data.error || "Failed to submit form");
      }

      // Track successful form submission
      if (posthog) {
        posthog.capture("form_submit_success", {
          email: formData.email,
        });
        posthog.capture("lead_captured", {
          name: formData.name,
          email: formData.email,
        });
        // Identify the user in PostHog
        posthog.identify(formData.email, {
          name: formData.name,
          email: formData.email,
          first_seen: new Date().toISOString(),
          signup_source: "lead_form",
        });
      }

      // Safe localStorage with verification
      let localStorageSuccess = false;
      try {
        localStorage.setItem(
          "tmu_movie_lead",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
          })
        );
        // Verify the write succeeded by reading it back
        const verification = localStorage.getItem("tmu_movie_lead");
        if (verification) {
          const parsed = JSON.parse(verification);
          localStorageSuccess =
            parsed.name === formData.name && parsed.email === formData.email;
        }
      } catch (storageError) {
        Sentry.captureException(storageError, {
          tags: { form: "lead-form", action: "localStorage" },
          extra: { email: formData.email },
        });
      }

      if (!localStorageSuccess) {
        toast.error("Unable to save your session", {
          description: "Please enable cookies and try again.",
        });
        setIsSubmitting(false);
        return;
      }

      // Success toast before redirect
      toast.success("Access granted!", {
        description: "Redirecting to the movie...",
        duration: 2000,
      });

      // Track movie page access
      if (posthog) {
        posthog.capture("movie_page_accessed");
      }

      // Redirect to movie page
      window.location.href = "/movie";

      // Fallback: if redirect doesn't happen within 3 seconds, reset button
      redirectTimeoutRef.current = setTimeout(() => {
        setIsSubmitting(false);
        toast.error("Redirect failed", {
          description: "Please click the button again or refresh the page.",
        });
        Sentry.captureMessage("Redirect timeout - user stuck on form", {
          level: "error",
          extra: { email: formData.email },
        });
      }, 3000);
    } catch (err) {
      console.error("Error submitting form:", err);

      // Capture exception with form context
      Sentry.captureException(err, {
        tags: { form: "lead-form", action: "submit" },
      });

      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit form";

      // Differentiate between validation errors (inline) and system errors (toast)
      if (
        errorMessage.includes("required") ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("valid email")
      ) {
        // Validation error - show inline
        setError(errorMessage);
      } else {
        // System/network error - show toast
        toast.error(errorMessage, {
          description: "Please try again or contact support.",
          duration: 5000,
        });
      }

      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null); // Clear error when user starts typing
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: newValue,
      }));

      // Track field completion when it becomes valid
      if (posthog) {
        if (field === "name" && newValue.trim()) {
          posthog.capture("form_field_completed", {
            field: "name",
            valid: true,
          });
        } else if (field === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(newValue.trim())) {
            posthog.capture("form_field_completed", {
              field: "email",
              valid: true,
            });
          }
        }
      }
    };

  const handleFieldFocus = (field: string) => () => {
    if (posthog) {
      posthog.capture("form_field_focused", {
        field,
      });
    }
  };

  return (
    <FormContainer className="w-full  lg:max-w-[21.8rem]">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 smartplayer-scroll-event"
      >
        {error && (
          <div
            className="px-4 py-3 rounded-2xl mb-3 text-center"
            style={{
              background: "rgba(255, 0, 0, 0.08)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 50, 50, 0.3)",
              boxShadow: "0 4px 16px rgba(255, 0, 0, 0.15)",
              color: "#ff8888",
              fontFamily: "Satoshi, sans-serif",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Full Name Field */}
        <Input
          type="text"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange("name")}
          onFocus={handleFieldFocus("name")}
          fullWidth
          required
          disabled={isSubmitting}
          valid={nameValid}
        />

        {/* Email Address Field */}
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange("email")}
          onFocus={handleFieldFocus("email")}
          fullWidth
          required
          disabled={isSubmitting}
          valid={emailValid}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="cta"
          fullWidth
          disabled={isSubmitting}
          className="!mt-3"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              WATCH FULL MOVIE NOW
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </Button>

        {/* Social Proof Text */}
        <p className="text-center text-white text-sm mt-3">
          An eye opening movie awaits you.
        </p>
      </form>
    </FormContainer>
  );
};
