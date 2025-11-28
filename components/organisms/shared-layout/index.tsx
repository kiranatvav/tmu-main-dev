"use client";

import { Logo } from "@/components/molecules/logo";
import { Disclaimer } from "@/components/organisms/disclaimer";
import { ReactNode } from "react";

interface SharedLayoutProps {
  children: ReactNode;
  hideLogo?: boolean;
  hideBinary?: boolean;
}

export const SharedLayout = ({
  children,
  hideLogo = false,
  hideBinary = true,
}: SharedLayoutProps) => {
  return (
    <div className="min-h-screen w-screen bg-[#0D0D0D] flex flex-col relative pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Grid SVG Background */}
      {/* <div
        className="absolute inset-0 z-0 "
        style={{
          maxWidth : "100vw",
          backgroundImage: "url(/main-grid-bgv2.png)",
          backgroundSize: "100% auto",
          backgroundPosition: "top",
          backgroundRepeat: "repeat-y",
        }}
      /> */}

      {/* Binary Matrix Background - Responsive */}
      {!hideBinary && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          {/* Desktop: 2/3 from left, Mobile: Centered with fewer columns */}
          <div className="hidden lg:block">
            {(() => {
              // Desktop: 5% start to 67% end (2/3 coverage) = ~62% span with 2.2% spacing = ~28 columns
              // Opacity gradient: Low on left, high in center, low on right
              const desktopColumns = [
                // Left section (columns 1-9): Lower opacity (0.15-0.25)
                { height: 35, opacity: 0.15, spacing: 2.2 },
                { height: 45, opacity: 0.18, spacing: 2.2 },
                { height: 28, opacity: 0.16, spacing: 2.2 },
                { height: 42, opacity: 0.2, spacing: 2.2 },
                { height: 38, opacity: 0.22, spacing: 2.2 },
                { height: 48, opacity: 0.24, spacing: 2.2 },
                { height: 40, opacity: 0.25, spacing: 2.2 },
                { height: 32, opacity: 0.28, spacing: 1.8 },
                { height: 44, opacity: 0.3, spacing: 1.8 },
                // Center section (columns 10-19): Higher opacity (0.35-0.50)
                { height: 36, opacity: 0.35, spacing: 2.5 },
                { height: 50, opacity: 0.42, spacing: 2.2 },
                { height: 30, opacity: 0.38, spacing: 1.8 },
                { height: 46, opacity: 0.45, spacing: 2.2 },
                { height: 34, opacity: 0.48, spacing: 2.0 },
                { height: 41, opacity: 0.5, spacing: 1.8 },
                { height: 38, opacity: 0.47, spacing: 2.2 },
                { height: 47, opacity: 0.45, spacing: 2.2 },
                { height: 33, opacity: 0.42, spacing: 2.0 },
                { height: 39, opacity: 0.4, spacing: 1.8 },
                // Right section (columns 20-28): Lower opacity (0.15-0.28)
                { height: 43, opacity: 0.32, spacing: 2.2 },
                { height: 37, opacity: 0.28, spacing: 2.0 },
                { height: 45, opacity: 0.26, spacing: 2.2 },
                { height: 31, opacity: 0.24, spacing: 1.8 },
                { height: 49, opacity: 0.22, spacing: 2.2 },
                { height: 35, opacity: 0.2, spacing: 2.0 },
                { height: 42, opacity: 0.18, spacing: 2.2 },
                { height: 36, opacity: 0.16, spacing: 2.0 },
                { height: 44, opacity: 0.15, spacing: 2.2 },
              ];

              let cumulativeX = 5;
              return desktopColumns.map((col, i) => {
                const xPos = cumulativeX;
                cumulativeX += col.spacing;

                return (
                  <div
                    key={`desktop-binary-${i}`}
                    className="absolute text-[#00ff05] font-mono text-[10px] leading-relaxed whitespace-pre"
                    style={{
                      left: `${xPos}%`,
                      top: "0%",
                      opacity: col.opacity,
                    }}
                  >
                    {[...Array(col.height)]
                      .map((_, j) => ((i + j) % 2 === 0 ? "1\n" : "0\n"))
                      .join("")}
                  </div>
                );
              });
            })()}
          </div>

          {/* Mobile: Full width with bell curve opacity */}
          <div className="block lg:hidden">
            {(() => {
              // Mobile: Left to right coverage with bell curve opacity
              // ~16 columns spanning from 3% to 90% with varied spacing
              const mobileColumns = [
                // Left edge: Low opacity (0.12-0.18)
                { height: 35, opacity: 0.12, spacing: 4.5 },
                { height: 40, opacity: 0.15, spacing: 5.0 },
                { height: 28, opacity: 0.18, spacing: 5.5 },
                // Building up: Increasing opacity (0.22-0.35)
                { height: 42, opacity: 0.22, spacing: 5.0 },
                { height: 38, opacity: 0.28, spacing: 5.5 },
                { height: 45, opacity: 0.32, spacing: 5.0 },
                { height: 32, opacity: 0.38, spacing: 5.5 },
                // Center peak: Highest opacity (0.42-0.50)
                { height: 48, opacity: 0.42, spacing: 5.0 },
                { height: 44, opacity: 0.48, spacing: 5.5 },
                { height: 50, opacity: 0.5, spacing: 5.0 },
                { height: 46, opacity: 0.48, spacing: 5.5 },
                // Declining: Decreasing opacity (0.38-0.28)
                { height: 36, opacity: 0.42, spacing: 5.0 },
                { height: 40, opacity: 0.35, spacing: 5.5 },
                { height: 34, opacity: 0.28, spacing: 5.0 },
                // Right edge: Low opacity (0.15-0.12)
                { height: 42, opacity: 0.2, spacing: 5.5 },
                { height: 38, opacity: 0.15, spacing: 5.0 },
              ];

              let cumulativeX = 3;
              return mobileColumns.map((col, i) => {
                const xPos = cumulativeX;
                cumulativeX += col.spacing;

                return (
                  <div
                    key={`mobile-binary-${i}`}
                    className="absolute text-[#00ff05] font-mono text-[10px] leading-relaxed whitespace-pre"
                    style={{
                      left: `${xPos}%`,
                      top: "0%",
                      opacity: col.opacity,
                    }}
                  >
                    {[...Array(col.height)]
                      .map((_, j) => ((i + j) % 2 === 0 ? "1\n" : "0\n"))
                      .join("")}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* Diagonal Spotlight from Center-Top-Left (Behind Logo) */}
      {/* <div
        className="absolute left-[35%] top-[5%] w-[1400px] h-[700px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 0% 0%, rgba(0, 255, 5, 0.25) 0%, rgba(0, 255, 5, 0.15) 25%, rgba(0, 255, 5, 0.08) 45%, transparent 70%)",
          transform: "rotate(30deg)",
          transformOrigin: "top left",
          filter: "blur(80px)",
        }}
      /> */}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Logo Section - Conditionally rendered */}
        {!hideLogo && (
          <div className="pt-8 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-12 px-4 md:px-6">
            <Logo />
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>

      {/* Disclaimer Footer */}
      <Disclaimer />
    </div>
  );
};
