"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { VIDEO_PLAYER_DESTROY_EVENT } from "@/components/organisms/video-player";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose }: ExitIntentModalProps) => {
  const router = useRouter();

  const calculateTimeLeft = useCallback(() => {
    const endDate = new Date("2025-11-30T23:59:59").getTime();
    const now = new Date().getTime();
    const difference = endDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // Countdown timer to November 30th, 2025
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-fadeIn"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      {/* Modal Content - Premium Glassmorphism */}
      <div
        className="relative max-w-2xl w-full animate-scaleIn"
        style={{
          borderRadius: "20px",
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid transparent",
          boxShadow:
            "0 0 60px rgba(0, 255, 5, 0.2), 0 8px 32px rgba(0, 0, 0, 0.6)",
          backgroundImage:
            "linear-gradient(rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0.95)), linear-gradient(135deg, rgba(0, 255, 5, 0.6) 0%, rgba(0, 255, 5, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.3) 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-10 md:p-16 text-center">
          {/* Main Headline - Clean White */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-3"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            Wait! Don&apos;t Miss This
          </h2>

          {/* Subheadline - Subtle */}
          <p
            className="text-sm md:text-base text-white/60 mb-8 tracking-wide"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
            }}
          >
            Exclusive Black Friday Offer
          </p>

          {/* Offer Container */}
          <div className="mb-10">
            <p className="text-xl md:text-2xl font-normal text-white mb-3">
              TMU Lifetime Membership
            </p>
            <div
              className="inline-block text-5xl md:text-6xl font-bold mb-2"
              style={{
                color: "#00ff05",
                textShadow:
                  "0 0 30px rgba(0, 255, 5, 0.5), 1px 1px 3px rgba(0, 0, 0, 0.9)",
                fontFamily: "General Sans, Satoshi, sans-serif",
              }}
            >
              33% OFF
            </div>
            <p className="text-sm text-white/60">Join 357+ serious traders</p>
          </div>

          {/* Body Copy - Cleaner */}
          <p
            className="text-white/70 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed"
            style={{
              fontFamily: "General Sans, Satoshi, sans-serif",
            }}
          >
            Understand How Time & Price Move All Markets.
          </p>

          {/* Countdown Timer - Refined */}
          <div className="mb-10">
            <p
              className="text-xs uppercase tracking-wider mb-6"
              style={{
                color: "#00ff05",
                textShadow: "0 0 10px rgba(0, 255, 5, 0.3)",
              }}
            >
              Offer Ends In
            </p>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    style={{
                      fontFamily: "General Sans, Satoshi, sans-serif",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button - Premium Green */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.dispatchEvent(new Event(VIDEO_PLAYER_DESTROY_EVENT));
              onClose();
              router.push("/book?discount=blackfriday");
            }}
            className="inline-block px-10 py-4 rounded-full font-bold text-base md:text-lg text-black transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              background: "#00ff05",
              boxShadow:
                "0 0 30px rgba(0, 255, 5, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)",
              fontFamily: "General Sans, Satoshi, sans-serif",
            }}
          >
            Claim Your Spot
          </button>

          {/* Compliance Disclaimer */}
          <p className="text-xs text-white/60 mt-6 max-w-md mx-auto">
            Trading education only. Risk of loss exists.
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};
