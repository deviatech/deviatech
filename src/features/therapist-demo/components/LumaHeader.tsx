import Link from "next/link";
import type { LocaleDictionary } from "../types";
import { route } from "../lib/routes";
import LumaButton from "./LumaButton";
import LocaleSwitch from "./LocaleSwitch";
import LumaMobileNavigation from "./LumaMobileNavigation";
import Container from "./Container";
import navStyles from "../styles/luma-nav.module.css";

export default function LumaHeader({ dictionary }: { dictionary: LocaleDictionary }) {
  const homeHref = route("home", dictionary.locale);
  const bookHref = route("book", dictionary.locale);

  return (
    <header className={navStyles.header}>
      <Container>
        <div className={navStyles.headerInner}>
          <Link href={homeHref} className={navStyles.brand} translate="no">
            {dictionary.brandName}
            <span className={navStyles.brandTagline}>{dictionary.brandTagline}</span>
          </Link>

          <nav className={navStyles.desktopNav} aria-label="Primary">
            <ul className={navStyles.desktopNavList}>
              {dictionary.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={navStyles.desktopNavLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={navStyles.desktopActions}>
              <LocaleSwitch dictionary={dictionary} />
              <LumaButton href={bookHref} variant="sage">
                {dictionary.nav.cta}
              </LumaButton>
            </div>
          </nav>

          <LumaMobileNavigation dictionary={dictionary} bookHref={bookHref} />
        </div>
      </Container>
    </header>
  );
}
