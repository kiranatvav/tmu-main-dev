"use client";

const SEGMENTS = [
  { text: "BLACK", color: "#ffffff" },
  { text: "FRIDAY", color: "#ff0000" },
  { text: "SALE", color: "#ff0000" },
  { text: "•", color: "#cccccc" },
  {
    text: "33%",
    color: "#00ff05",
    textShadow: "0 0 10px rgba(0, 255, 5, 0.8), 0 0 20px rgba(0, 255, 5, 0.5)",
  },
  { text: "OFF", color: "#ffffff" },
  { text: "TMU", color: "#ffffff" },
  { text: "LIFETIME", color: "#ffffff" },
  { text: "•", color: "#cccccc" },
  { text: "ENDS", color: "#ffffff" },
  { text: "NOV", color: "#ffffff" },
  { text: "30TH", color: "#ffffff" },
  { text: "•", color: "#cccccc" },
];

const SCROLL_DURATION_SECONDS = 65;

const BannerContent = () => (
  <>
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-4 px-6"
        style={{
          fontFamily: "General Sans, Satoshi, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        {SEGMENTS.map((segment, idx) => (
          <span
            key={idx}
            style={{
              color: segment.color,
              textShadow: segment.textShadow,
            }}
          >
            {segment.text}
          </span>
        ))}
      </div>
    ))}
  </>
);

export const BlackFridayBanner = () => {
  return (
    <div
      className="fixed  top-0 left-0 right-0 overflow-hidden"
      style={{
        height: "40px",
        backgroundColor: "#000000",
        zIndex: 9999,
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* <div className="absolute -top-[40%]  left-[50%] -z-10">
        <div className=" rotate-0 bg-green-500 blur-md h-24 w-6 opacity-90  shadow-[0_0_100px_70px_#00ff00]"></div>

      </div> */}
      <div
        className="flex whitespace-nowrap items-center justify-center h-full"
        style={{
          display: "inline-flex",
          minWidth: "max-content",
          animation: `scroll-banner ${SCROLL_DURATION_SECONDS}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* <p className="text-white">Black Friday Sale: Get 33% off TMU Lifetime. Offer ends November 30th</p> */}
        {/* First set of content */}
        <BannerContent />
        {/* Duplicate set for seamless loop */}
        <BannerContent />
      </div>
    </div>
  );
};
