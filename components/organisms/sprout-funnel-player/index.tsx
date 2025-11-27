"use client";

import { useEffect, useRef, useState } from "react";

type SproutPlayerInstance = {
  play: (index?: number) => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  seek: (seconds: number) => void;
  bind: (event: string, listener: (event?: unknown) => void) => void;
  unbind: (event: string, listener: (event?: unknown) => void) => void;
};

type SproutPlayerConstructor = new (options: {
  videoId: string;
  playlistId?: string;
  target?: HTMLIFrameElement;
  events?: Record<string, unknown>;
}) => SproutPlayerInstance;

declare global {
  interface Window {
    SV?: {
      Player: SproutPlayerConstructor;
    };
  }
}

const SPROUT_PLAYER_API_SRC = "https://c.sproutvideo.com/player_api.js";
const DEFAULT_EMBED_SRC =
  "https://videos.sproutvideo.com/embed/a49bd8be151decc82e/d207286e68f78b66?autoPlay=true&settingsButton=false&loop=true&playsinline=true&volume=0";
const DEFAULT_VIDEO_ID = "a49bd8be151decc82e";

let sproutScriptPromise: Promise<void> | null = null;

const loadSproutApi = () => {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.SV?.Player) return Promise.resolve();
  if (sproutScriptPromise) return sproutScriptPromise;

  sproutScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SPROUT_PLAYER_API_SRC}"]`
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", (error) => reject(error));
      return;
    }

    const script = document.createElement("script");
    script.src = SPROUT_PLAYER_API_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => {
      sproutScriptPromise = null;
      reject(error);
    };
    document.body.appendChild(script);
  });

  return sproutScriptPromise;
};

interface SproutFunnelPlayerProps {
  className?: string;
  embedSrc?: string;
  videoId?: string;
}

export const SproutFunnelPlayer = ({
  className = "",
  embedSrc = DEFAULT_EMBED_SRC,
  videoId = DEFAULT_VIDEO_ID,
}: SproutFunnelPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<SproutPlayerInstance | null>(null);
  const playerReadyRef = useRef(false);
  const forceUnmutedRef = useRef(false);
  const [currentSrc, setCurrentSrc] = useState(embedSrc);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Prop sync for fallback: reset source and overlay if embed changes externally.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSrc(embedSrc);
    forceUnmutedRef.current = false;
    setOverlayVisible(true);
  }, [embedSrc, videoId]);

  const buildUnmutedSrc = () => {
    try {
      const url = new URL(embedSrc);
      url.searchParams.set("muted", "false");
      url.searchParams.set("volume", "1");
      url.searchParams.set("autoPlay", "true"); // click should satisfy gesture requirement
      url.searchParams.set("playsinline", "true");
      url.searchParams.set("cb", Date.now().toString());
      return url.toString();
    } catch (error) {
      console.warn(
        "[SproutFunnelPlayer] failed to parse embedSrc, using fallback",
        error
      );
      return `${embedSrc}${
        embedSrc.includes("?") ? "&" : "?"
      }muted=false&volume=1&autoPlay=true&playsinline=true&cb=${Date.now()}`;
    }
  };

  // Initialize SproutVideo API + player
  useEffect(() => {
    let cancelled = false;
    let readyHandler: ((event?: unknown) => void) | null = null;

    playerRef.current = null;
    playerReadyRef.current = false;

    console.log("[SproutFunnelPlayer] effect run", {
      videoId,
      currentSrc,
      forceUnmuted: forceUnmutedRef.current,
    });

    loadSproutApi()
      .then(() => {
        if (cancelled || !window.SV?.Player) return;

        const player = new window.SV.Player({
          videoId,
          target: iframeRef.current ?? undefined,
        });
        playerRef.current = player;
        console.log("[SproutFunnelPlayer] player constructed");

        const volumeLogger = (event?: unknown) => {
          console.log("[SproutFunnelPlayer] volume event", event);
        };
        const playLogger = (event?: unknown) => {
          console.log("[SproutFunnelPlayer] play event", event);
        };
        const pauseLogger = (event?: unknown) => {
          console.log("[SproutFunnelPlayer] pause event", event);
        };

        try {
          player.bind("volume", volumeLogger);
          player.bind("play", playLogger);
          player.bind("pause", pauseLogger);
        } catch (error) {
          console.warn(
            "[SproutFunnelPlayer] failed to bind debug listeners",
            error
          );
        }

        readyHandler = () => {
          if (cancelled) return;
          playerReadyRef.current = true;
          console.log("[SproutFunnelPlayer] ready event");
          try {
            const shouldUnmute = forceUnmutedRef.current;
            player.setVolume(shouldUnmute ? 1 : 0);
            player.seek(0);
            player.play();
            console.log("[SproutFunnelPlayer] autoplay kick-off done", {
              shouldUnmute,
            });
          } catch (error) {
            console.warn("Sprout player ready handler failed", error);
          }
        };

        player.bind("ready", readyHandler);
      })
      .catch((error) => {
        console.error("Failed to load SproutVideo API", error);
      });

    return () => {
      cancelled = true;

      if (playerRef.current && readyHandler) {
        try {
          playerRef.current.unbind("ready", readyHandler);
        } catch {
          /* ignore */
        }
      }

      playerRef.current = null;
    };
  }, [currentSrc, videoId]);

  const handleUnmute = () => {
    forceUnmutedRef.current = true;
    const nextSrc = buildUnmutedSrc();
    setCurrentSrc(nextSrc);

    const player = playerRef.current;
    if (!player) {
      console.log(
        "[SproutFunnelPlayer] unmute click but player not ready yet; awaiting ready"
      );
      return;
    }

    const sendRawCommand = (name: string, data?: unknown) => {
      const targetWindow = iframeRef.current?.contentWindow;
      if (!targetWindow) return;
      try {
        targetWindow.postMessage(
          JSON.stringify({ name, data }),
          "https://videos.sproutvideo.com"
        );
        console.log("[SproutFunnelPlayer] raw postMessage", { name, data });
      } catch (error) {
        console.warn("[SproutFunnelPlayer] raw postMessage failed", {
          name,
          data,
          error,
        });
      }
    };

    const performUnmute = () => {
      try {
        const getVolume =
          typeof (player as unknown as { getVolume?: () => number })
            .getVolume === "function"
            ? (player as unknown as { getVolume: () => number }).getVolume
            : undefined;
        console.log("[SproutFunnelPlayer] performUnmute start", {
          ready: playerReadyRef.current,
          preVolume: getVolume ? getVolume() : "n/a",
        });

        player.seek(0); // restart from the beginning
        player.setVolume(1);
        player.play();
        // Belt-and-suspenders: also send raw commands directly to the iframe.
        sendRawCommand("seek", "0");
        sendRawCommand("volume", "1");
        sendRawCommand("play");
        console.log("[SproutFunnelPlayer] performUnmute executed");
        setTimeout(() => {
          try {
            console.log("[SproutFunnelPlayer] post-unmute volume", {
              volume: getVolume ? getVolume() : "n/a",
            });
          } catch (error) {
            console.warn(
              "[SproutFunnelPlayer] post-unmute volume check failed",
              error
            );
          }
        }, 300);
        setOverlayVisible(false);
      } catch (error) {
        console.warn("Failed to unmute SproutVideo player", error);
      }
    };

    // If the player is already ready, unmute immediately.
    if (playerReadyRef.current) {
      console.log("[SproutFunnelPlayer] unmute click while ready");
      performUnmute();
      return;
    }

    // Otherwise, wait for the ready event once, then unmute.
    const readyAndUnmute = () => {
      playerReadyRef.current = true;
      player.unbind("ready", readyAndUnmute);
      console.log("[SproutFunnelPlayer] delayed unmute after ready");
      performUnmute();
    };

    try {
      player.bind("ready", readyAndUnmute);
      console.log(
        "[SproutFunnelPlayer] unmute click before ready; binding temporary ready listener"
      );
    } catch (error) {
      console.warn("Failed to bind ready listener for unmute", error);
    }
  };

  return (
    <div className={`relative w-full aspect-video ${className}`}>
      <iframe
        key={currentSrc}
        ref={iframeRef}
        className="sproutvideo-player w-full h-full rounded-xl overflow-hidden"
        src={currentSrc}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          border: 0,
        }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        title="Sprout Funnel Player"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {overlayVisible && (
        <button
          type="button"
          onClick={handleUnmute}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/55 backdrop-blur-sm transition duration-300 hover:bg-black/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
          <span className="pointer-events-none absolute inset-10 rounded-3xl border border-white/15 shadow-[0_0_60px_rgba(0,255,5,0.35)]" />
          <div className="relative flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-gray-900 shadow-lg shadow-lime-400/30">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500 text-black shadow-lg shadow-lime-400/60">
              🔊
            </span>
            <div className="text-left leading-tight">
              <div>Tap to unmute</div>
              <div className="text-xs font-medium text-gray-700">
                Replay with sound from the start
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};
