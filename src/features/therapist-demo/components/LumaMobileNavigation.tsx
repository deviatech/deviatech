"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LocaleDictionary } from "../types";
import LumaButton from "./LumaButton";
import LocaleSwitch from "./LocaleSwitch";
import navStyles from "../styles/luma-nav.module.css";

export default function LumaMobileNavigation({
  dictionary,
  bookHref,
}: {
  dictionary: LocaleDictionary;
  bookHref: string;
}) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className={navStyles.mobileNav}>
      <button
        ref={triggerRef}
        type="button"
        className={navStyles.menuTrigger}
        aria-expanded={open}
        aria-controls="luma-mobile-drawer"
        aria-label={open ? dictionary.nav.menuCloseLabel : dictionary.nav.menuOpenLabel}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={navStyles.menuIcon} aria-hidden="true">
          {open ? "✕" : "☰"}
        </span>
      </button>

      {open && (
        <div
          className={navStyles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="luma-mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={dictionary.nav.menuOpenLabel}
        className={`${navStyles.drawer} ${open ? navStyles.drawerOpen : ""}`}
        style={{ overscrollBehavior: "contain" }}
      >
        <nav aria-label="Mobile">
          <ul className={navStyles.drawerList}>
            {dictionary.nav.links.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onClick={() => setOpen(false)}
                  className={navStyles.drawerLink}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={navStyles.drawerFooter}>
          <LocaleSwitch dictionary={dictionary} className={navStyles.drawerLocale} />
          <LumaButton
            href={bookHref}
            variant="sage"
            anchorProps={{ onClick: () => setOpen(false) }}
          >
            {dictionary.nav.cta}
          </LumaButton>
        </div>
      </div>
    </div>
  );
}
