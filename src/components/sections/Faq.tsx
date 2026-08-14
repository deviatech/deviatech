"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SheetFrame from "@/components/ui/SheetFrame";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { faqs } from "@/content/faq";

export default function Faq() {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !listRef.current) return;
      gsap.from(listRef.current.children, {
        opacity: 0,
        y: 14,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: listRef, dependencies: [] }
  );

  return (
    <SheetFrame number="07" label="FAQ">
      <p className="font-mono text-xs tracking-wide text-ink-soft">COMMON QUESTIONS</p>
      <div ref={listRef} className="mt-8 flex flex-col divide-y divide-line-grid border-t border-b border-line-grid">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber">
              {faq.question}
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-lg text-accent-amber transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 font-body text-sm text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
    </SheetFrame>
  );
}
