"use client";

import { VideoPlayer } from "@/components/organisms/video-player";
import { LeadForm } from "@/components/organisms/lead-form";
import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";
import { ExitIntentModal } from "@/components/organisms/exit-intent-modal";
import { useExitIntent } from "@/hooks/useExitIntent";
import { ReactVideoPlayer } from "@/components/organisms/react-video-player";
import Image from "next/image";

export const FunnelPageTemplate = () => {
  const { showModal, closeModal } = useExitIntent({ enabled: false });

  return (
    <SharedLayout hideLogo>
      {/* BG layer */}
      <div
        className="absolute inset-0 -z-30 "
        style={{
          maxWidth : "100vw",
          backgroundImage: "url(/main-grid-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Exit Intent Modal */}
      <ExitIntentModal isOpen={showModal} onClose={closeModal} />
      {/* Parent Container */}
      <div className="w-full flex flex-col items-center justify-center overflow-x-clip">
        <div className="w-full flex flex-col items-center">
          {/* Logo - Top Center */}
          <div className="flex justify-center mt-10 mb-6">
            <Logo />
          </div>

          {/* Headline Text - Centered */}
          <div className="text-center mb-6 lg:mb-10 max-w-[720px] w-full mx-auto">
            <h1
              className="text-[clamp(1.1rem,2.8vw,1.7rem)] md:text-[clamp(1.6rem,2.5vw,2.5rem)]  leading-tight text-white mx-auto"
              style={{
                fontFamily: "General Sans, Satoshi, sans-serif",
                // textShadow:
                //   "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 10px rgba(0, 255, 5, 0.3), 4px 4px 12px rgba(0, 0, 0, 0.95), 2px 2px 4px rgba(0, 0, 0, 1)",
              }}
            >
              You&apos;ve Been Playing the Market&apos;s Game.
            </h1>
            <h2
              className="text-[clamp(1.05rem,2.6vw,1.65rem)] md:text-[clamp(1.5rem,2.5vw,2.5rem)]   leading-tight text-white mx-auto"
              style={{
                fontFamily: "General Sans, Satoshi, sans-serif",
                // textShadow:
                //   "0 0 30px rgba(255, 255, 255, 0.7), 0 0 50px rgba(255, 255, 255, 0.35), 0 0 10px rgba(0, 255, 5, 0.25), 4px 4px 12px rgba(0, 0, 0, 0.95), 2px 2px 4px rgba(0, 0, 0, 1)",
              }}
            >
              Now it&apos;s{" "}
              <span
                className="relative"
                style={{
                  color: "#000000",
                  // textShadow:
                  //   "0 0 20px rgba(0, 255, 5, 1), 0 0 40px rgba(0, 255, 5, 0.8), 0 0 60px rgba(0, 255, 5, 0.4), 0 0 80px rgba(0, 255, 5, 0.2), 4px 4px 12px rgba(0, 0, 0, 1), 2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                Time
              <div className="absolute  w-full h-full bg-[linear-gradient(94.33deg,#00FF05_0%,#A6FF00_100%)] top-0 -rotate-2 -left-0 -z-10"></div>
              </span>{" "}
              to Learn the Rules.
            </h2>
            <p
              className="text-white text-sm md:text-base mt-4 mx-auto max-w-[520px]"
              style={{
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              See Below How the System Works.
            </p>
          </div>

          {/* Two Column Grid: Video wider than form - Centered */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-[1140px] w-full h-full mb-16 px-6 lg:px-0 ">
            {/* Left Column - Video (wider, first on mobile) */}
            <div className="w-full relative max-w-[30rem] md:max-w-[56rem] h-full   overflow-hidden rounded-4xl flex flex-col items-center ">
              {/* <VideoPlayer exitIntentOpen={showModal} className=" relative overflow-hidden " /> */}
              <div className="absolute bottom-3 md:bottom-8 right-3 md:right-8  z-20">
                <div className="flex gap-2 md:gap-5 items-end">
                  <div className="w-[48px] md:w-[72px]  aspect-square">
                  <Image src={"/tmu-white-logo.png"} alt="The Matrix Unlocked" fill className="object-contain max-w-[48px] md:max-w-[72px]" />
                </div>
                <div >
                  <h3 className="text-white text-2xl md:text-[32px] leading-5 md:leading-8" style={{
                    fontFamily : 'Aguafina Script, Satoshi'
                  }}>Frank Warrink</h3>
                  <p className="text-white text-[10px] md:text-xs">Founder CEO, Visionary</p>
                  <p className="text-white text-[10px] md:text-xs">The Matrix Unlocked</p>
                </div>
                </div>
              </div>
              <ReactVideoPlayer videoUrl="https://d2zc0gy08nitgj.cloudfront.net/video-data/Out_now_Reel4_v2_cropped.mp4" />
            </div>

            {/* Right Column - Form */}
            <div className="w-full  lg:max-w-[21.8rem] h-fit flex flex-col items-center">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};
