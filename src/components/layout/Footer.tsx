import Link from "next/link";
import { site } from "@/content/site";
import { LinkedInIcon, FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const quickLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Stack", href: "/#stack" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
];

const linkClass =
  "transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber";

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold text-white">{site.name}</p>
            <p className="mt-3 max-w-xs font-body text-sm text-footer-text">{site.tagline}</p>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wide text-footer-text/70">QUICK LINKS</p>
            <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wide text-footer-text/70">CONTACT</p>
            <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
              <li>{site.location}</li>
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={linkClass}>
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs tracking-wide text-footer-text/70">FOLLOW</p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-footer-text transition-colors hover:border-accent-amber hover:text-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 font-mono text-xs text-footer-text/70">
          &copy; {new Date().getFullYear()} DeviaTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
