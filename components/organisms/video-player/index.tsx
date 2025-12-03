"use client";

import { useCallback, useEffect, useRef } from "react";

interface VideoPlayerProps {
  className?: string;
  exitIntentOpen?: boolean;
  playerId?: string;
  scriptSrc?: string;
}

export const VIDEO_PLAYER_DESTROY_EVENT = "tmu-video-destroy";

const DEFAULT_PLAYER_ID = "vid-6924cc5a3752bd8e79933f36";
const PLAYER_SCRIPT_ID = "vturb-player-script";
const DEFAULT_PLAYER_SCRIPT_SRC =
  "https://scripts.converteai.net/2f1a2a53-b695-4680-8c86-09db4b468975/players/6924cc5a3752bd8e79933f36/v4/player.js";

export const VideoPlayer = ({
  className = "",
  exitIntentOpen = false,
  playerId = DEFAULT_PLAYER_ID,
  scriptSrc = DEFAULT_PLAYER_SCRIPT_SRC,
}: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevExitIntentOpen = useRef(exitIntentOpen);
  const destroyedRef = useRef(false);

  const removePlayerScript = useCallback(() => {
    const existingLoader = document.getElementById(PLAYER_SCRIPT_ID);
    existingLoader?.parentElement?.removeChild(existingLoader);
  }, []);

  const destroyPlayer = useCallback(() => {
    destroyedRef.current = true;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    removePlayerScript();

    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
    }
  }, [removePlayerScript]);

  const injectPlayer = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    destroyedRef.current = false;

    // Inject vturb-smartplayer matching the original embed style
    container.innerHTML = `
      <vturb-smartplayer
        id="${playerId}"
        layout="fill"
        style="display: block; margin: 0 auto; height: 100%;"
      ></vturb-smartplayer>
    `;

    // Remove any existing loader and append a fresh one
    removePlayerScript();

    const loader = document.createElement("script");
    loader.id = PLAYER_SCRIPT_ID;
    loader.src = scriptSrc;
    loader.async = true;
    document.head.appendChild(loader);

    // setTimeout(() => {
    //   const el = containerRef.current?.querySelector('[slot="preload"]') as HTMLElement | null;
    //   if (el) {
    //     el.style.setProperty("padding", "0", "important");
    //     el.style.setProperty("padding-top", "0", "important");
    //     el.style.setProperty("height", "100%", "important");
    //     el.style.setProperty("position", "absolute", "important");
    //     el.style.setProperty("inset", "0", "important");
    //   }
    // }, 300);
  }, [playerId, scriptSrc, removePlayerScript]);

  // Initial load
  useEffect(() => {
    injectPlayer();
  }, [injectPlayer]);

  // Allow external events (e.g. CTA) to tear down the player before navigation
  useEffect(() => {
    const handleDestroy = () => destroyPlayer();
    window.addEventListener(VIDEO_PLAYER_DESTROY_EVENT, handleDestroy);
    return () => {
      window.removeEventListener(VIDEO_PLAYER_DESTROY_EVENT, handleDestroy);
    };
  }, [destroyPlayer]);

  // Remount when exit intent modal closes
  useEffect(() => {
    if (
      !destroyedRef.current &&
      prevExitIntentOpen.current &&
      !exitIntentOpen
    ) {
      injectPlayer();
    }
    prevExitIntentOpen.current = exitIntentOpen;
  }, [exitIntentOpen, injectPlayer]);

  // Fallback: allow vturb to trigger scroll-to-form via class hook
  useEffect(() => {
    const scrollToSmartplayerTarget = () => {
      const target = document.querySelector(
        ".smartplayer-scroll-event"
      ) as HTMLElement | null;

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const messageHandler = (event: MessageEvent) => {
      const data = event.data;

      if (
        data === "smartplayer-scroll-event" ||
        data === "smartplayer-scroll" ||
        (typeof data === "object" &&
          data !== null &&
          (data.type === "smartplayer-scroll-event" ||
            data.action === "smartplayer-scroll-event"))
      ) {
        scrollToSmartplayerTarget();
      }
    };

    // Expose helpers for vturb script variants
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).smartplayerScrollEvent = scrollToSmartplayerTarget;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).smartplayerScrollTo = scrollToSmartplayerTarget;

    window.addEventListener(
      "smartplayer-scroll-event",
      scrollToSmartplayerTarget
    );
    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener(
        "smartplayer-scroll-event",
        scrollToSmartplayerTarget
      );
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => () => destroyPlayer(), [destroyPlayer]);

  return (
    <div className={`relative w-full h-full ${className}`} ref={containerRef} />
  );
};
