"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import SignatureIllustration from "@/components/ui/SignatureIllustration";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rootRef.current) return;

      gsap
        .timeline({ delay: 0.35, defaults: { ease: "power3.out" } })
        .from("[data-hero-eyebrow]", { opacity: 0, y: 10, duration: 0.4 })
        .from(
          "[data-hero-heading]",
          { opacity: 0, y: 24, duration: 0.6 },
          "-=0.2"
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.12 },
          "-=0.35"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 12, duration: 0.4, stagger: 0.08 },
          "-=0.3"
        )
        .from(
          illustrationRef.current,
          { opacity: 0, y: 16, scale: 0.97, duration: 0.6 },
          "-=0.5"
        );

      if (illustrationRef.current) {
        gsap.to(illustrationRef.current, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div ref={rootRef}>
      <SheetFrame number="01" label="HERO" id="hero">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p data-hero-eyebrow className="font-mono text-xs tracking-wide text-ink-soft">
              LAHORE, PAKISTAN
            </p>
            <h1
              data-hero-heading
              className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-[4rem]"
            >
              Shopify Stores and Custom Software Built in Lahore
            </h1>
            <p data-hero-sub className="mt-6 font-display text-xl font-medium text-ink">
              From idea to launched.
            </p>
            <p data-hero-sub className="mt-3 max-w-md font-body text-lg text-ink-soft">
              DeviaTech builds online stores for local businesses and MVPs for
              startups — designed, built, and shipped in Lahore.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span data-hero-cta>
                <Button
                  href={buildWhatsAppLink(site.whatsappDefaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="whatsapp_click"
                  data-ga-label="hero"
                >
                  Start on WhatsApp
                </Button>
              </span>
              <span data-hero-cta>
                <Button href="#work" variant="secondary">
                  See our work
                </Button>
              </span>
            </div>
          </div>
          <div ref={illustrationRef} className="flex justify-center md:justify-end">
            <SignatureIllustration />
          </div>
        </div>
      </SheetFrame>
    </div>
  );
}
