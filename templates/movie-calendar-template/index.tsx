"use client";

import { CalendarSection } from "@/components/organisms/calendar-section";
import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";
import { ExitIntentModal } from "@/components/organisms/exit-intent-modal";
import { useExitIntent } from "@/hooks/useExitIntent";

export const MovieCalendarTemplate = () => {
  const { showModal, closeModal } = useExitIntent({ enabled: false });

  return (
    <SharedLayout hideLogo>
      {/* Exit Intent Modal */}
      <ExitIntentModal isOpen={showModal} onClose={closeModal} />
      {/* Parent Container */}
      <div className="w-full flex items-center justify-center px-4 py-6 lg:py-12">
        {/* Two Column Grid: 1/3 for text, 2/3 for calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 w-full max-w-[1800px] items-center">
          {/* Left Column - Logo & Text (1/3) */}
          <div className="flex flex-col items-center lg:items-start gap-4 md:gap-6 justify-self-center lg:justify-self-end lg:pr-8 max-w-md">
            <Logo />
            <div className="text-center lg:text-left space-y-4">
              <h1
                className="text-white text-[28px] md:text-[36px] lg:text-[40px] leading-[1.15] font-semibold"
                style={{
                  fontFamily: "General Sans, Satoshi, sans-serif",
                  textShadow:
                    "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 10px rgba(0, 255, 5, 0.3), 4px 4px 12px rgba(0, 0, 0, 0.95), 2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                Ready to See What&apos;s Been Hidden in Plain Sight?
              </h1>
              <p
                className="text-white/80 text-[15px] md:text-[16px] leading-[1.6] font-normal"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  textShadow:
                    "0 0 20px rgba(255, 255, 255, 0.5), 2px 2px 8px rgba(0, 0, 0, 0.9)",
                }}
              >
                Schedule your private 1:1 strategy session to discover how Time
                & Price moves all markets.
              </p>
              <div className="pt-1 border-t border-white/10 mt-4">
                <p
                  className="text-white/70 text-[13px] md:text-[14px] leading-[1.5] font-normal"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    textShadow:
                      "0 0 15px rgba(255, 255, 255, 0.4), 2px 2px 6px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  Limited spots available. Select a time below.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar (2/3) */}
          <div className="flex items-center justify-center w-full">
            <CalendarSection />
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};
