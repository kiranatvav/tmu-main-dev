"use client";

import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";
// import Image from "next/image";
import CongratulationsSteps from "@/components/organisms/steps-section";
import { usePageView } from "@/hooks/usePageView";

export const ThankYouTemplate = () => {
  // Track page view
  usePageView({
    pageName: "thank_you",
    pagePath: "/thankyou",
  });

  return (
    <SharedLayout hideLogo>
      {/* BG layer */}
      <div
        className="absolute  inset-0 -z-30 "
        style={{
          maxWidth: "100vw",
          backgroundImage: "url(/thankyou-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute left-0  w-full md:w-[250px] h-[460px] md:h-[250px] top-0  pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse 40% 70% at 30% 0%, rgba(0, 255, 5, 0.23) 70%, rgba(0, 255, 5, 0.2) 40%, transparent 70%)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
        }}
      />

      <div className="w-full flex items-center justify-center px-4 py-8 overflow-x-clip">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          {/* Success Icon - Checkmark */}
          <div className="flex justify-center overflow-visible items-center relative ">
            <svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3332 0C36.2201 0 46.6664 10.4463 46.6664 23.3332C46.6664 36.2201 36.2201 46.6664 23.3332 46.6664C10.4463 46.6664 0 36.2201 0 23.3332C0 10.4463 10.4463 0 23.3332 0ZM31.5815 14.8889L20.0316 26.4389L15.0849 21.4899C14.8683 21.2731 14.6111 21.1011 14.328 20.9837C14.0449 20.8663 13.7414 20.8059 13.4349 20.8058C12.816 20.8055 12.2223 21.0512 11.7844 21.4887C11.3466 21.9262 11.1005 22.5198 11.1003 23.1387C11.1001 23.7577 11.3458 24.3514 11.7833 24.7892L18.2186 31.2245C18.4569 31.463 18.7399 31.6521 19.0514 31.7812C19.3629 31.9103 19.6967 31.9767 20.0339 31.9767C20.3711 31.9767 20.7049 31.9103 21.0164 31.7812C21.3279 31.6521 21.6109 31.463 21.8492 31.2245L34.8832 18.1906C35.321 17.7527 35.5669 17.1589 35.5669 16.5397C35.5669 15.9206 35.321 15.3267 34.8832 14.8889C34.4453 14.4511 33.8515 14.2051 33.2323 14.2051C32.6131 14.2051 32.0193 14.4511 31.5815 14.8889Z"
                fill="url(#paint0_linear_2538_12840)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2538_12840"
                  x1="2.33332"
                  y1="4.37498"
                  x2="53.4377"
                  y2="35.5755"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.190173" stop-color="#00FF05" />
                  <stop offset="1" stop-color="#005C02" />
                </linearGradient>
              </defs>
            </svg>
            <div
              className="absolute overflow-visible  -top-[20%] left-[49%] -translate-y-1/2 -translate-x-1/2 scale-200 w-[400px] aspect-square"
              style={{
                backgroundImage: "url(/tick-rays-v1.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                WebkitMaskImage:
                  "radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%)",
                maskImage:
                  "radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%)",
              }}
            ></div>
          </div>

          {/* Thank You Heading */}
          <h1
            className="text-white text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1]  mb-4"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
              color: "#ffffff",
            }}
          >
            Congratulations!
          </h1>

          {/* Confirmation Message */}
          <div className="space-y-6">
            <p
              className="text-white/90 text-[18px] md:text-[20px] leading-[1.6] font-normal mb-8"
              style={{
                fontFamily: "Satoshi, sans-serif",
                textShadow:
                  "0 0 20px rgba(255, 255, 255, 0.5), 2px 2px 8px rgba(0, 0, 0, 0.9)",
              }}
            >
              Your call has been successfully scheduled.
            </p>

            {/* Next Steps Section */}
            <div className="mt-8">
              <h2
                className="text-white text-[24px] md:text-[32px]  mb-6"
                style={{
                  fontFamily: "General Sans, Satoshi, sans-serif",
                }}
              >
                What&apos;s Next?
              </h2>

              {/* <div className="space-y-5 text-left">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: "rgba(0, 255, 5, 0.2)",
                      border: "1px solid rgba(0, 255, 5, 0.5)",
                      boxShadow:
                        "0 0 15px rgba(0, 255, 5, 0.4), 0 0 25px rgba(0, 255, 5, 0.2)",
                    }}
                  >
                    <span
                      className="text-[#00ff05] font-bold text-base"
                      style={{ fontFamily: "General Sans, sans-serif" }}
                    >
                      1
                    </span>
                  </div>
                  <p
                    className="text-white/90 text-[15px] md:text-[16px] leading-[1.6]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      textShadow: "1px 1px 6px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    <span
                      className="font-semibold text-white"
                      style={{
                        textShadow:
                          "0 0 10px rgba(0, 255, 5, 0.2), 1px 1px 4px rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      Check Your Email
                    </span>{" "}
                    - You&apos;ll receive a confirmation with all the details of
                    your scheduled call.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: "rgba(0, 255, 5, 0.2)",
                      border: "1px solid rgba(0, 255, 5, 0.5)",
                      boxShadow:
                        "0 0 15px rgba(0, 255, 5, 0.4), 0 0 25px rgba(0, 255, 5, 0.2)",
                    }}
                  >
                    <span
                      className="text-[#00ff05] font-bold text-base"
                      style={{ fontFamily: "General Sans, sans-serif" }}
                    >
                      2
                    </span>
                  </div>
                  <p
                    className="text-white/90 text-[15px] md:text-[16px] leading-[1.6]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      textShadow: "1px 1px 6px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    <span
                      className="font-semibold text-white"
                      style={{
                        textShadow:
                          "0 0 10px rgba(0, 255, 5, 0.2), 1px 1px 4px rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      Prepare Your Questions
                    </span>{" "}
                    - Think about what you&apos;d like to learn about Time &
                    Price and how it moves the markets.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      background: "rgba(0, 255, 5, 0.2)",
                      border: "1px solid rgba(0, 255, 5, 0.5)",
                      boxShadow:
                        "0 0 15px rgba(0, 255, 5, 0.4), 0 0 25px rgba(0, 255, 5, 0.2)",
                    }}
                  >
                    <span
                      className="text-[#00ff05] font-bold text-base"
                      style={{ fontFamily: "General Sans, sans-serif" }}
                    >
                      3
                    </span>
                  </div>
                  <p
                    className="text-white/90 text-[15px] md:text-[16px] leading-[1.6]"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      textShadow: "1px 1px 6px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    <span
                      className="font-semibold text-white"
                      style={{
                        textShadow:
                          "0 0 10px rgba(0, 255, 5, 0.2), 1px 1px 4px rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      Be Ready at Your Scheduled Time
                    </span>{" "}
                    - We&apos;ll connect with you at the time you selected to
                    begin your private 1:1 strategy session.
                  </p>
                </div>
              </div> */}

              <CongratulationsSteps />
            </div>

            {/* Additional Message */}
            <p
              className="text-white text-start md:text-center w-[85%] md:w-full text-[14px] md:text-[15px] leading-[1.6] mt-8"
              style={{
                fontFamily: "Satoshi, sans-serif",
              }}
            >
              We look forward to showing you what&apos;s been hidden in plain
              sight.
            </p>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};
