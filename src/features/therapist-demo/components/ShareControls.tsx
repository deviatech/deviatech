"use client";

import { useState } from "react";
import styles from "../styles/luma-blog.module.css";

export default function ShareControls({
  title,
  shareLabel,
  copyLinkLabel,
  copiedLabel,
}: {
  title: string;
  shareLabel: string;
  copyLinkLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently no-op, the URL is already visible in the address bar.
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // User cancelled the native share sheet — no error state needed.
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div className={styles.shareRow} role="group" aria-label={shareLabel}>
      <button type="button" className={styles.shareButton} onClick={handleShare}>
        {shareLabel}
      </button>
      <button type="button" className={styles.shareButton} onClick={handleCopy} aria-live="polite">
        {copied ? copiedLabel : copyLinkLabel}
      </button>
    </div>
  );
}
