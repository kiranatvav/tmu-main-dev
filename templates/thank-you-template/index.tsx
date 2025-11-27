"use client";

import { SharedLayout } from "@/components/organisms/shared-layout";
import { Logo } from "@/components/molecules/logo";

export const ThankYouTemplate = () => {
  return (
    <SharedLayout hideLogo>
      <div className="w-full flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          {/* Success Icon - Checkmark */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0, 255, 5, 0.15)",
                border: "3px solid #00ff05",
                boxShadow:
                  "0 0 30px rgba(0, 255, 5, 0.5), 0 0 60px rgba(0, 255, 5, 0.3), 0 0 90px rgba(0, 255, 5, 0.15)",
              }}
            >
              <svg
                className="w-10 h-10 md:w-12 md:h-12"
                fill="none"
                stroke="#00ff05"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* Thank You Heading */}
          <h1
            className="text-white text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] font-bold mb-4"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
              textShadow:
                "0 0 30px rgba(0, 255, 5, 0.5), 0 0 60px rgba(0, 255, 5, 0.3), 0 0 10px rgba(255, 255, 255, 0.4), 4px 4px 12px rgba(0, 0, 0, 0.95), 2px 2px 4px rgba(0, 0, 0, 1)",
              color: "#00ff05",
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
            <div
              className="mt-8 p-8 md:p-10 rounded-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(0, 255, 5, 0.15)",
                boxShadow:
                  "0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px rgba(0, 255, 5, 0.1)",
              }}
            >
              <h2
                className="text-white text-[24px] md:text-[28px] font-bold mb-6"
                style={{
                  fontFamily: "General Sans, Satoshi, sans-serif",
                  textShadow:
                    "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.4), 0 0 10px rgba(0, 255, 5, 0.3), 4px 4px 12px rgba(0, 0, 0, 0.95), 2px 2px 4px rgba(0, 0, 0, 1)",
                }}
              >
                What&apos;s Next?
              </h2>

              <div className="space-y-5 text-left">
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
              </div>
            </div>

            {/* Additional Message */}
            <p
              className="text-white/85 text-[14px] md:text-[15px] leading-[1.6] mt-8"
              style={{
                fontFamily: "Satoshi, sans-serif",
                textShadow: "1px 1px 6px rgba(0, 0, 0, 0.9)",
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
