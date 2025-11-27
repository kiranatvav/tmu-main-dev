"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";

export const VideoCTA = () => {
  const router = useRouter();

  return (
    <div
      className="relative bg-[#030303] rounded-[20px] px-8 py-8  flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
      style={{
        border: "1px solid transparent",
        backgroundImage:
          "linear-gradient(#030303, #030303), linear-gradient(-1deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 40%, rgba(0, 255, 5, 0) 60%, rgba(0, 255, 5, 0.6) 100%)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      {/* Left Side - Text */}
      <div className="flex-1">
        <h2
          className="text-white text-[24px] md:text-[32px] leading-[1.1] font-normal mb-3"
          style={{ fontFamily: "General Sans, Satoshi, sans-serif" }}
        >
          Book a call, get clarity, and enroll into the 
          <br/>Lifetime TMU Membership.
        </h2>
        {/* <p
          className="text-white text-[14px] md:text-[16px] leading-[1.5] font-normal max-w-[667px]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Once you see it, you can&apos;t unsee it. It&apos;s Time & Price.
        </p> */}
      </div>

      {/* Right Side - CTA Button */}
      <div className="flex-shrink-0 w-full md:w-auto">
        <Button
          onClick={() => router.push("/book")}
          variant="cta"
          className="!w-fit md:!w-[214px]"
        >
          SCHEDULE NOW
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
