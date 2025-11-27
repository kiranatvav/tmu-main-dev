"use client";

import { useEffect, useState } from "react";

export const CalendarSection = () => {
  const [calendarUrl, setCalendarUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Normalized thank-you destination (existing route: /thankyou)
  const redirectToThankYou = () => {
    window.location.href = "/thankyou";
  };

  useEffect(() => {
    // Fetch geo location data
    const fetchGeoData = async () => {
      try {
        const response = await fetch("/api/geo");
        const geoData = await response.json();

        // Log country for debugging
        console.log("Current country:", geoData.country);
        console.log("Full geo data:", geoData);

        // Determine calendar based on country
        const isNorthAmerica =
          geoData.country === "US" || geoData.country === "CA";

        if (isNorthAmerica) {
          console.log("Loading US/Canada calendar");
          setCalendarUrl(
            "https://api.leadconnectorhq.com/widget/booking/KaJWJ9iqmffEDdIjyeeh"
          );
        } else {
          console.log("Loading Rest of World calendar");
          setCalendarUrl(
            "https://api.leadconnectorhq.com/widget/booking/b8qewifcw8aBKWGiXcHI"
          );
        }
      } catch (error) {
        console.error("Error fetching geo data:", error);
        // Default to Rest of World calendar on error
        setCalendarUrl(
          "https://api.leadconnectorhq.com/widget/booking/b8qewifcw8aBKWGiXcHI"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoData();
  }, []);

  useEffect(() => {
    // Load the GoHighLevel calendar embed script only after URL is set
    if (!calendarUrl) return;

    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [calendarUrl]);

  useEffect(() => {
    const handleBookingMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      const allowedOrigin =
        origin.includes("leadconnectorhq.com") ||
        origin.includes("msgsndr.com") ||
        origin.includes("gohighlevel.com") ||
        origin === "" || // some embeds postMessage with empty origin on mobile
        origin === window.location.origin;

      if (!allowedOrigin) return;

      const data = event.data;
      const asString = typeof data === "string" ? data.toLowerCase() : "";
      const asJson =
        typeof data === "object" && data !== null
          ? JSON.stringify(data).toLowerCase()
          : "";

      const matchString =
        /booking|appointment|scheduled|success|confirmed/.test(asString) ||
        /booking|appointment|scheduled|success|confirmed/.test(asJson);

      if (matchString) {
        redirectToThankYou();
      }
    };

    window.addEventListener("message", handleBookingMessage);
    return () => window.removeEventListener("message", handleBookingMessage);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      {/* Calendar Iframe Container - With glass effect and gradient border */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid transparent",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.02)), linear-gradient(135deg, rgba(0, 255, 5, 0.6) 0%, rgba(0, 255, 5, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.3) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        {isLoading ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: "600px" }}
          >
            <div
              className="text-white/70"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              Loading calendar...
            </div>
          </div>
        ) : (
          <iframe
            src={calendarUrl}
            style={{
              width: "100%",
              border: "none",
              overflow: "hidden",
              minHeight: "600px",
            }}
            scrolling="no"
            id="ghl_movie_calendar"
            title="Book Your Call"
          />
        )}
      </div>
    </div>
  );
};
