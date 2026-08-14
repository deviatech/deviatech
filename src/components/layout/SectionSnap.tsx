"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Magnetically snaps scroll position to the center of whichever
 * [data-snap-section] is nearest, giving each section (rendered via
 * SheetFrame) a "fit to viewport center" scroll-stop.
 */
export default function SectionSnap() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const sections = gsap.utils.toArray<HTMLElement>("[data-snap-section]");
    if (sections.length < 2) return;

    const nearestSnapProgress = (progress: number) => {
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll) return progress;

      const points = sections.map((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const center = top + rect.height / 2 - window.innerHeight / 2;
        return gsap.utils.clamp(0, 1, center / maxScroll);
      });

      // Past the last section's center (footer) or before the first
      // section's center — there's nothing to magnetize to here, so leave
      // scroll position untouched instead of pulling back into a section.
      if (progress > Math.max(...points) || progress < Math.min(...points)) {
        return progress;
      }

      let closest = points[0];
      let minDiff = Infinity;

      points.forEach((point) => {
        const diff = Math.abs(progress - point);
        if (diff < minDiff) {
          minDiff = diff;
          closest = point;
        }
      });

      return closest;
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: {
        snapTo: nearestSnapProgress,
        duration: { min: 0.35, max: 0.9 },
        delay: 0.05,
        ease: "power2.inOut",
      },
    });

    return () => trigger.kill();
  }, []);

  return null;
}
