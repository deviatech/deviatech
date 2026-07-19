import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Stack", href: "/#stack" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-grid bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
          <Image
            src="/logo/typography-logo-dark.png"
            alt="DeviaTech"
            width={140}
            height={32}
            style={{ width: "auto", height: "2rem" }}
            priority
          />
        </Link>
        <nav className="hidden gap-8 font-body text-sm text-ink-soft md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href={buildWhatsAppLink(site.whatsappDefaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-accent-amber px-4 py-2 font-body text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
        >
          Chat on WhatsApp
        </Link>
      </div>
    </header>
  );
}
