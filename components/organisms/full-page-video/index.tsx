"use client";

import { useState } from "react";
import { UnmuteBanner } from "@/components/organisms/unmute-banner";

export const FullPageVideo = () => {
  const [showUnmuteIndicator] = useState(true);

  return (
    <div className="w-full max-w-[1420px] mx-auto px-4 mb-12">
      {/* 16:9 Responsive Video Container */}
      <div
        className="relative w-full rounded-3xl overflow-hidden border-2 border-gray-300"
        style={{ paddingBottom: "56.25%" }}
      >
        {/* Unmute Indicator - Points to native controls */}
        {showUnmuteIndicator && <UnmuteBanner />}

        <iframe
          className="sproutvideo-player absolute top-0 left-0 w-full h-full"
          src="https://videos.sproutvideo.com/embed/a49bd8be151decc82e/d207286e68f78b66?autoPlay=true"
          frameBorder="0"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="TMU Miami Full Movie"
        />
      </div>
    </div>
  );
};
