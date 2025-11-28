"use client";

import { CalendarSection } from "@/components/organisms/calendar-section";
import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";
import { ExitIntentModal } from "@/components/organisms/exit-intent-modal";
import { useExitIntent } from "@/hooks/useExitIntent";
import Image from "next/image";

export const MovieCalendarTemplate = () => {
  const { showModal, closeModal } = useExitIntent({ enabled: false });

  return (
    <SharedLayout hideLogo>
      {/* Exit Intent Modal */}
      <ExitIntentModal isOpen={showModal} onClose={closeModal} />
      {/* Parent Container */}
      <div className="w-full flex items-center justify-center px-4 py-6 lg:py-12 overflow-x-clip">
        {/* Two Column Grid: 1/3 for text, 2/3 for calendar */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row gap-18 lg:gap-6 w-full max-w-7xl ">
          {/* Left Column - Logo & Text (1/3) */}
          <div className="flex flex-col items-center lg:items-start gap-4 md:gap-6  w-full max-w-md">
            <Logo />
            <div className="text-center lg:text-left space-y-7">
              <h1
                className="text-white text-4xl sm:text-[40px] leading-[1.15] "
                style={{
                  fontFamily: "General Sans, Satoshi, sans-serif",
                  
                }}
              >
                Ready to See <br/>What&apos;s Been Hidden <br/>in Plain Sight?
              </h1>
              <p
                className="text-white text-[15px] md:text-[16px] leading-[1.6] "
                style={{
                  fontFamily: "Satoshi, sans-serif",
                }}
              >
                Schedule your private 1:1 strategy session to discover how <br/>Time
                & Price moves all markets.
              </p>
              <div className="pt-1 lg:pt-0 border-t border-white/10 ">
                <p
                  className="text-white text-[13px] md:text-[14px] leading-[1.5] "
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                  }}
                >
                  Limited spots available. Select a time below.
                </p>
              </div>
            </div>
          </div>

            <div
            className="fixed -left-[25%] w-[60%] h-[600px] transition-opacity duration-100 ease-linear md:h-[700px] md:opacity-40 top-0 pointer-events-none -z-10"
            style={{
              background: 
              // "red",
                "radial-gradient(ellipse 50% 50% at 50% 15%, rgba(0, 255, 5, 0.28) 50%, rgba(0, 255, 5, 0.2) 80%, transparent 40%)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          />

          {/* Right Column - Calendar (2/3) */}
          <div className="relative w-full lg:max-w-[595px]">
              <div className="absolute -top-[40%] left-[48%] -translate-x-1/2  h-[150%] w-[240%] -z-10">
                  <Image
                    src="/form-gradient-bg.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
              </div>
            <CalendarSection />
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};
