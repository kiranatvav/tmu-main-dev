"use client";

import { useEffect, useState } from "react";

interface UseExitIntentOptions {
  threshold?: number;
  enabled?: boolean;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const { threshold = 50, enabled = true } = options;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!enabled) {
      console.debug("[ExitIntent] Disabled via options");
      return;
    }

    // Only on desktop (not mobile)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      console.debug("[ExitIntent] Mobile user detected, skipping");
      return;
    }

    console.debug(
      "[ExitIntent] Attaching listeners with threshold:",
      threshold
    );

    const fireExitIntent = (reason: string, event?: MouseEvent) => {
      console.debug("[ExitIntent] Triggered:", reason, {
        clientX: event?.clientX,
        clientY: event?.clientY,
      });
      setShowModal(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Detect when mouse leaves the viewport from the top
      const leftViewport =
        !e.relatedTarget &&
        (e.clientY <= threshold || e.clientY <= 0 || e.clientX <= 0);
      if (leftViewport) {
        fireExitIntent("mouseout-top-or-left", e);
      }
    };

    // Also detect mouseout from document
    const handleDocumentMouseOut = (e: MouseEvent) => {
      const target = e.relatedTarget as Node | null;
      // If relatedTarget is null, mouse left the document
      const leftDocument = !target || target.nodeName === "HTML";
      const nearEdge =
        e.clientY <= threshold ||
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth;
      if (leftDocument && nearEdge) {
        fireExitIntent("document-mouseleave", e);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener(
      "mouseleave",
      handleDocumentMouseOut
    );

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleDocumentMouseOut
      );
    };
  }, [threshold, enabled]);

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, closeModal };
};
