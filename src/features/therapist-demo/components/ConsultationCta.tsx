import type { DemoLocale } from "../types";
import { route } from "../lib/routes";
import LumaButton from "./LumaButton";
import styles from "../styles/luma-content.module.css";

export default function ConsultationCta({
  locale,
  heading,
  body,
  buttonLabel,
}: {
  locale: DemoLocale;
  heading: string;
  body: string;
  buttonLabel: string;
}) {
  return (
    <div className={styles.ctaPanel}>
      <h2>{heading}</h2>
      <p className={styles.ctaPanelBody}>{body}</p>
      <LumaButton href={route("book", locale)} variant="onCharcoal">
        {buttonLabel}
      </LumaButton>
    </div>
  );
}
