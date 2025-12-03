"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export const FormContainer = ({ children, className }: FormContainerProps) => {
  return (
    <div
      className={cn("relative w-full h-full ", className)}
      style={{
        maxWidth: "500px",
        minHeight: "auto",
      }}
    >
      <div
        className="absolute -top-[52%] left-1/2 -translate-x-1/2 h-[175%] w-[240%] -z-10"
        style={{
          backgroundImage: "url('/form-gradient-bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      {/* Intense Green Glow - Between logo and top half of form */}
      {/* <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0 overflow-visible w-[420px] h-[360px] sm:w-[520px] sm:h-[440px] md:w-[650px] md:h-[550px]"
        style={{
          top: "-150px",
          mixBlendMode: "screen",
        }}
      > */}
      {/* <Image
          src="/green-oval-glow-intense.svg"
          alt=""
          fill
          className="object-contain"
        /> */}
      {/* </div> */}

      {/* Subtle Green Glow - Bottom half of form */}
      {/* <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-0 overflow-visible w-[420px] h-[360px] sm:w-[500px] sm:h-[430px] md:w-[600px] md:h-[520px]"
        style={{
          top: "200px",
          mixBlendMode: "screen",
        }}
      > */}

      {/* <Image
          src="/green-oval-glow-subtle.svg"
          alt=""
          fill
          className="object-contain"
        /> */}
      {/* </div> */}

      {/* Black background container with gradient border */}
      <div
        className="absolute inset-0 rounded-4xl z-[1]"
        style={{
          background: "black",
          border: "1px solid transparent",
          backgroundImage:
            "linear-gradient(black, black), conic-gradient(from 0deg, rgba(0,255,5,0.7) 0deg, rgba(0,255,5,0) 90deg, rgba(255,255,255,0.5) 170deg, rgba(255,255,255,0) 250deg, rgba(0,255,5,0.7) 360deg)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        />


      {/* Content wrapper - Flex layout for responsive height */}
      <div className="relative z-[2]  h-full flex flex-col justify-center  py-4  sm:py-5 px-6 md:py-8">
        {/* Header Text */}
        <div className="mb-6 lg:text-center">
          <h2
            className="text-white text-3xl min-[430px]:text-4xl font-normal  leading-snug"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
              // textShadow:
              //   "0 0 20px rgba(0, 255, 5, 0.3), 0 0 40px rgba(0, 255, 5, 0.15), 2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 2px rgba(255, 255, 255, 0.8)",
            }}
          >
            Unlock Full Access
            <br />
            <span className="inline-block relative pb-4">
              To&nbsp;
              {/*Green BG */}
              <div className="absolute w-32 min-[430px]:w-38 h-11 bg-[linear-gradient(94.33deg,#00FF05_0%,#A6FF00_100%)] top-1 min-[430px]:top-2 -rotate-2 left-[38px] min-[430px]:left-[46px] -z-10"></div>
              <span
                style={{
                  color: "#000000",
                  // textShadow:
                  //   "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5), 0 0 45px rgba(255, 255, 255, 0.3), 2px 2px 8px rgba(0, 0, 0, 0.9)",
                }}
              >
                &quot;The Key&quot;
              </span>
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
          </h2>
          <p
            className="text-white text-sm md:text-base"
            style={{
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            A 20-minute film that reveals how the market truly moves beneath the
            surface.
          </p>
        </div>

        {/* Form content - Centered */}
        <div>{children}</div>
      </div>
    </div>
  );
};
