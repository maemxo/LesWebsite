"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const softenEdgeScroll = (gesture: { deltaX: number; deltaY: number }) => {
  if (gesture.deltaY === 0 || typeof window === "undefined") return true;

  const scrollPosition = window.scrollY;
  const scrollLimit = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const distanceToEdge =
    gesture.deltaY > 0 ? scrollLimit - scrollPosition : scrollPosition;
  const edgeProgress = Math.min(1, Math.max(0, distanceToEdge / 280));
  const resistance = 0.12 + 0.88 * edgeProgress ** 2;

  gesture.deltaY *= resistance;
  return true;
};

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        lerp: 0.075,
        respectReducedMotion: true,
        syncTouch: true,
        virtualScroll: softenEdgeScroll,
        wheelMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}