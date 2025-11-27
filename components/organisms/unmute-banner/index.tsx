"use client";

export const UnmuteBanner = () => {
  return (
    <div className="absolute top-6 right-6 z-50 pointer-events-none">
      {/* Pulsing Green Square with Unmute Icon */}
      <div
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center"
        style={{
          background: "rgba(0, 255, 0, 0.15)",
          border: "3px solid #00ff00",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      >
        {/* Unmute Icon */}
        <svg
          className="w-8 h-8 md:w-10 md:h-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="#00ff00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Sound waves */}
          <path
            d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
            stroke="#00ff00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.07 5.93C19.9447 7.80528 20.9979 10.3462 20.9979 13C20.9979 15.6538 19.9447 18.1947 18.07 20.07"
            stroke="#00ff00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Pulsing ring effect */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            border: "3px solid #00ff00",
            animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            opacity: 0.75,
          }}
        />
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 40px rgba(0, 255, 0, 0.8);
          }
        }
        @keyframes ping {
          75%,
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
