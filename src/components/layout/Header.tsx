"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import {
  LuBriefcase,
  LuLayers,
  LuBoxes,
  LuNewspaper,
  LuMail,
} from "react-icons/lu";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const navLinks = [
  { label: "Work", href: "/#work", icon: LuBriefcase },
  { label: "Services", href: "/shopify-development-lahore", icon: LuLayers },
  { label: "Stack", href: "/#stack", icon: LuBoxes },
  { label: "Blog", href: "/blog", icon: LuNewspaper },
  { label: "Contact", href: "/contact", icon: LuMail },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !headerRef.current) return;
    ScrollTrigger.create({
      start: 48,
      toggleClass: { targets: headerRef.current, className: "is-scrolled" },
    });
  }, { dependencies: [] });

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 border-b border-line-grid bg-paper/90 backdrop-blur transition-shadow duration-300 [&.is-scrolled]:shadow-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-[padding] duration-300 [.is-scrolled_&]:py-2.5">
        <Link
          href="/"
          className="flex origin-left items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink transition-transform duration-300 [.is-scrolled_&]:scale-[0.82]"
        >
          <Image
            src="/logo/typography-logo-dark.png"
            alt="DeviaTech"
            width={140}
            height={32}
            style={{ width: "auto", height: "2rem" }}
            priority
          />
        </Link>
        <nav className="hidden gap-6 font-body text-sm text-ink-soft md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center py-2 text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
            >
              <link.icon
                aria-hidden="true"
                className="h-[1.1rem] w-[1.1rem] shrink-0"
              />
              <span className="ml-2 max-w-[6rem] overflow-hidden whitespace-nowrap opacity-100 transition-[max-width,opacity,margin-left] duration-300 [.is-scrolled_&]:ml-0 [.is-scrolled_&]:max-w-0 [.is-scrolled_&]:opacity-0">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <Link
          href={buildWhatsAppLink(site.whatsappDefaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="whatsapp_click"
          data-ga-label="header"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center gap-2 rounded-sm bg-accent-amber px-4 py-2 font-body text-sm font-medium text-ink transition-[padding,transform] duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber [.is-scrolled_&]:px-2.5"
        >
          <WhatsAppIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap [.is-scrolled_&]:hidden">
            Chat on WhatsApp
          </span>
        </Link>
      </div>
    </header>
  );
}
