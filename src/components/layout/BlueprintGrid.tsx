"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function BlueprintGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !gridRef.current) return;
    gsap.to(gridRef.current, {
      backgroundPositionY: "120px",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  }, { dependencies: [] });

  return (
    <div
      ref={gridRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(var(--line-grid) 1px, transparent 1px), linear-gradient(90deg, var(--line-grid) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPositionY: "0px",
        opacity: 0.15,
      }}
    />
  );
}
