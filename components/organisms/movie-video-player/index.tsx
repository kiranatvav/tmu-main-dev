"use client";

import { Signature } from "@/components/molecules/signature";

interface MovieVideoPlayerProps {
  className?: string;
}

export const MovieVideoPlayer = ({ className = "" }: MovieVideoPlayerProps) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Glass effect container with rounded corners - Rectangular (16:9) */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        {/* Sprout Video Responsive Embed - 20% reduced height */}
        <div style={{ position: "relative", height: 0, paddingBottom: "45%" }}>
          <iframe
            className="sproutvideo-player"
            src="https://videos.sproutvideo.com/embed/8c9bdeb81a11efc406/8ae92a124e592b10?autoPlay=true&fullscreenButton=false&settingsButton=false&loop=true"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
            }}
            frameBorder="0"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Video Player"
          />
        </div>

        {/* Signature Overlay - Bottom Right */}
        <div className="absolute bottom-4 right-6 md:bottom-5 md:right-8 z-10">
          <Signature />
        </div>
      </div>

      {/* Below-video instruction pointing to speaker */}
      <div className="mt-3 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: "growPulse 2s ease-in-out infinite",
              color: "#00ff05",
            }}
          >
            <path
              d="M12 4L12 20M12 4L6 10M12 4L18 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-xs"
            style={{
              color: "#F4F4F4",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            Click the speaker icon to play with sound
          </span>
        </div>

        {/* Animation styles */}
        <style jsx>{`
          @keyframes growPulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.3);
            }
          }
        `}</style>
      </div>
    </div>
  );
};
