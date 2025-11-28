"use client";

import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface ReactVideoPlayerProps {
  className?: string;
  videoUrl: string; // HLS (.m3u8) or MP4 URL
  loop?: boolean;
  showControls?: boolean;
}

export const ReactVideoPlayer = ({
  className = "",
  videoUrl,
  loop = true,
  showControls = false,
}: ReactVideoPlayerProps) => {
  const ref = useRef(null);
  const [muted, setMuted] = useState<boolean>(true);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setMuted(!muted);
      }}
      className={`relative  w-full h-full ${className}`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-50">
        <div
          className={` transition-opacity duration-100 ease-linear cursor-pointer  scale-200 md:scale-400 `}
        >
          <div className="flex flex-col justify-center items-center ">
            <div className="text-white ">
              {muted && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-volume-off-icon lucide-volume-off"
                >
                  <path d="M16 9a5 5 0 0 1 .95 2.293" className="vol-arc-1" />
                  <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"  className="vol-arc-2" />
                  <path d="m2 2 20 20" />
                  <path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11" />
                  <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
                </svg>
              )}
            </div>
          </div>
        </div>
        {muted && <p className="text-white mt-4 md:mt-12 text-xl md:text-2xl">Your video is playing</p>}
      </div>

      <div>
        <ReactPlayer
          ref={ref}
          src={videoUrl}
          playing={true}
          muted={muted}
          controls={showControls}
          playsInline
          loop={loop}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
