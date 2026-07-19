"use client";

import { useEffect, useRef, useState } from "react";

export default function SignatureIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (reduceMotion || !svgRef.current) return;
    const paths = svgRef.current.querySelectorAll<SVGPathElement>("path[data-draw]");
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.08}s`;
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, [reduceMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 400"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="A hand-drawn wireframe sketch resolving into a finished storefront screen"
    >
      {/* device frame */}
      <rect
        x="40"
        y="30"
        width="400"
        height="340"
        rx="12"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        data-draw
      />
      {/* browser bar */}
      <path
        d="M40 80 H440"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        data-draw
      />
      <circle cx="62" cy="55" r="5" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />
      <circle cx="82" cy="55" r="5" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />
      <circle cx="102" cy="55" r="5" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />

      {/* hero block */}
      <rect
        x="64"
        y="104"
        width="352"
        height="90"
        rx="4"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="2"
        data-draw
      />
      {/* headline lines */}
      <path d="M84 130 H300" stroke="var(--ink)" strokeWidth="3" data-draw />
      <path d="M84 150 H360" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M84 168 H240" stroke="var(--ink-soft)" strokeWidth="2" data-draw />

      {/* three cards */}
      <rect x="64" y="214" width="104" height="120" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />
      <rect x="188" y="214" width="104" height="120" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />
      <rect x="312" y="214" width="104" height="120" rx="4" fill="none" stroke="var(--ink)" strokeWidth="2" data-draw />

      <path d="M78 236 H154" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M78 254 H144" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M202 236 H278" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M202 254 H268" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M326 236 H402" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
      <path d="M326 254 H392" stroke="var(--ink-soft)" strokeWidth="2" data-draw />
    </svg>
  );
}
