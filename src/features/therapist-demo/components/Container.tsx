import type { ReactNode } from "react";
import styles from "../styles/luma.module.css";

const sizeClass = {
  content: styles.containerContent,
  wide: styles.containerWide,
  article: styles.containerArticle,
} as const;

export default function Container({
  size = "content",
  children,
  className,
}: {
  size?: "content" | "wide" | "article";
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${sizeClass[size]} ${className ?? ""}`}>{children}</div>;
}
