"use client";

import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";
import { VideoCTA } from "@/components/organisms/video-cta";
import { VideoPlayer } from "@/components/organisms/video-player";
import { ExitIntentModal } from "@/components/organisms/exit-intent-modal";
import { useExitIntent } from "@/hooks/useExitIntent";
import { usePageView } from "@/hooks/usePageView";
import { ReactVideoPlayer } from "@/components/organisms/react-video-player";

export const MovieWatchTemplate = () => {
  const { showModal, closeModal } = useExitIntent({ enabled: false });

  // Track page view
  usePageView({
    pageName: "movie",
    pagePath: "/movie/watch",
  });

  return (
    <SharedLayout hideLogo hideBinary>
      {/* BG layer */}
      <div
        className="absolute inset-0 -z-30 "
        style={{
          maxWidth: "100vw",
          backgroundImage: "url(/movie-page-main-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
            <div
        className="absolute inset-0 -bottom-18 -z-30 "
        style={{
          maxWidth: "100vw",
          backgroundImage: "url(/movie-pattern-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Exit Intent Modal */}
      <ExitIntentModal isOpen={showModal} onClose={closeModal} />
      {/* Main Content - All visible on desktop */}
      <div className="w-full flex flex-col items-center justify-center py-4 md:py-6 px-4">
        {/* Logo */}
        <div className="mt-10 mb-3 md:mb-4 flex-shrink-0 relative">
          <Logo />
          {/* Oval Glow Behind BOOK NOW Button */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 pointer-events-none z-0"
            style={{
              width: "80%",
              height: "150px",
              background:
                // "red",
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 255, 5, 0.40) 90%, rgba(0, 255, 5, 0.2) 30%, transparent 70%)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Headline Text */}
        <div className="text-center relative mb-4 md:mb-6  max-w-2xl px-6">
          <h2
            className="text-[40px] text-white mb-6"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
            }}
          >
            Watch{" "}
            <span className="whitespace-nowrap md:whitespace-normal">
              <span className=" inline-block relative pb-4">
              <span
                style={{
                  color: "#000000",
                }}
              >
                &quot;The Key&quot;
              </span>
              <div className="absolute  w-full h-full bg-[linear-gradient(94.33deg,#00FF05_0%,#A6FF00_100%)] -top-1 -rotate-1 -left-0 -z-10"></div>

              {/* Green stripes underneath */}
              {/* <div
                className="absolute left-0 right-0 flex flex-col gap-[2px]"
                style={{ top: "calc(100% - 8px)" }}
              >
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    background:
                      "linear-gradient(90deg, transparent 0%, #00ff05 20%, #00ff05 50%, #00ff05 80%, transparent 100%)",
                    boxShadow: "0 0 10px rgba(0, 255, 5, 0.8)",
                  }}
                />
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    background:
                      "linear-gradient(90deg, transparent 5%, #00ff05 25%, #00ff05 50%, #00ff05 75%, transparent 95%)",
                    boxShadow: "0 0 8px rgba(0, 255, 5, 0.6)",
                  }}
                />
              </div> */}
            </span>{" "}
            Movie
            </span>
          </h2>
          {/* Oval Glow Behind BOOK NOW Button */}
          <div
            className="absolute left-[40%] -translate-x-1/2 top-[90%] -translate-y-1/2 pointer-events-none z-0"
            style={{
              width: "80%",
              height: "100px",
              background:
                // "red",
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 255, 5, 0.40) 90%, rgba(0, 255, 5, 0.2) 30%, transparent 70%)",
              filter: "blur(60px)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <div className="relative w-full px-6 flex flex-col justify-center max-w-[1140px] items-center gap-8 overflow-x-clip">
          {/* Video Player - Using VideoPlayer component */}
          <div 
            style={{
              background: "black",
              border: "1px solid transparent",
              backgroundImage:
                "conic-gradient(from 0deg, rgba(0,255,5,0.7) 50deg, rgba(0,255,5,0) 90deg, rgba(255,255,255,0.5) 220deg, rgba(255,255,255,0) 300deg, rgba(0,255,5,0.7) 360deg)",
              backgroundOrigin: "border-box",
              backgroundClip: "border-box",
            }}
          className="w-full rounded-4xl aspect-[16/9] flex justify-center items-center p-[1px] flex-shrink-0">
            {/* TEMPORARY: Using vturb VideoPlayer until uncropped videos are available from CloudFront.
                Once uncropped videos are ready, uncomment ReactVideoPlayer below and remove VideoPlayer. */}
            <VideoPlayer
              className="relative rounded-4xl overflow-hidden"
              exitIntentOpen={showModal}
              playerId="vid-6924ba788dbc00147a278f10"
              scriptSrc="https://scripts.converteai.net/2f1a2a53-b695-4680-8c86-09db4b468975/players/6924ba788dbc00147a278f10/v4/player.js"
            />
            {/* TEMPORARY: Commented out until uncropped videos are available from CloudFront */}
            {/* <div className="overflow-hidden rounded-4xl aspect-video relative">
              <ReactVideoPlayer showControls videoUrl="https://d2zc0gy08nitgj.cloudfront.net/video-data/Out_now_Reel4_v2_cropped.mp4" />
            </div> */}
          </div>
          <div className="w-full md:w-[90%] flex justify-center">
            {/* CTA Section with glow flex justify-center items-center */}
            <div className="w-full  relative mt-3 md:mt-4 flex-shrink-0 ">
              {/* Oval Glow Behind BOOK NOW Button */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[35%] -translate-y-1/2 pointer-events-none z-0"
                style={{
                  width: "80%",
                  height: "150px",
                  background:
                    // "red",
                    "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0, 255, 5, 0.45) 90%, rgba(0, 255, 5, 0.2) 30%, transparent 70%)",
                  filter: "blur(60px)",
                  mixBlendMode: "screen",
                }}
              />
              <div className="relative z-10 ">
                <VideoCTA />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};
