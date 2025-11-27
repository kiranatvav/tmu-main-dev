"use client";

import { Button } from "@/components/atoms/button";

export const CTAFooter = () => {
  const handleBookNow = () => {
    const calendarUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;
    if (calendarUrl) {
      window.location.href = calendarUrl;
    } else {
      console.error("GHL Calendar URL not configured");
      // Fallback or error handling
      alert(
        "Calendar booking is currently unavailable. Please try again later."
      );
    }
  };

  return (
    <div className="bg-black w-full py-16 mt-8">
      <div className="max-w-[1420px] mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">
          {/* CTA Text */}
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to unlock the Matrix?
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Book your free strategy call with our team.
            </p>
          </div>

          {/* Book now button with TMU green accent */}
          <Button
            onClick={handleBookNow}
            variant="secondary"
            size="lg"
            className="!bg-[#00FF57] hover:!bg-[#00DD4A] !text-black !font-bold !px-12 !py-6 !text-2xl md:!text-3xl !leading-normal whitespace-nowrap transition-all duration-200"
          >
            Book your call now
          </Button>

          {/* Secondary text */}
          <p className="text-sm text-gray-400 max-w-xl">
            Prefer to just watch for now? You can book later from your email.
          </p>
        </div>
      </div>
    </div>
  );
};
