import Link from "next/link";
import type { LocaleDictionary } from "../types";
import { route } from "../lib/routes";
import Container from "./Container";
import LumaButton from "./LumaButton";
import footerStyles from "../styles/luma-footer.module.css";

export default function LumaFooter({ dictionary }: { dictionary: LocaleDictionary }) {
  const brandName = dictionary.locale === "fa" ? "لوما تراپی" : "Luma Therapy";
  const bookHref = route("book", dictionary.locale);

  return (
    <footer className={footerStyles.footer}>
      <Container>
        <div className={footerStyles.grid}>
          <div className={footerStyles.brandCol}>
            <p className={footerStyles.brandName} translate="no">
              {brandName}
            </p>
            <p className={footerStyles.brandBlurb}>{dictionary.footer.brandBlurb}</p>
          </div>

          <div>
            <p className={footerStyles.colHeading}>{dictionary.footer.linksHeading}</p>
            <ul className={footerStyles.linkList}>
              {dictionary.footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerStyles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerStyles.colHeading} translate="no">
              {dictionary.footer.contactHeading}
            </p>
            <p className={footerStyles.contactCta}>{dictionary.footer.contactCta}</p>
            <LumaButton href={dictionary.footer.deviatechLinkHref} variant="onCharcoal" className={footerStyles.deviatechButton}>
              {dictionary.footer.deviatechLinkLabel}
            </LumaButton>
            <LumaButton href={bookHref} variant="outline" className={footerStyles.bookLink}>
              {dictionary.nav.cta}
            </LumaButton>
          </div>
        </div>

        <div className={footerStyles.legalRow}>
          <p className={footerStyles.conceptNotice}>{dictionary.footer.conceptNotice}</p>
        </div>
      </Container>
    </footer>
  );
}
