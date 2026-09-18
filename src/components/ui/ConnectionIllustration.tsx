export default function ConnectionIllustration() {
  return (
    <svg
      viewBox="0 0 300 160"
      className="h-auto w-full max-w-xs"
      aria-hidden="true"
    >
      {/* corner brackets around the connection area */}
      <path d="M6 16 V6 H16" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" />
      <path d="M294 144 V154 H284" fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" />

      {/* connection line */}
      <line
        x1="60"
        y1="80"
        x2="240"
        y2="80"
        stroke="var(--ink-soft)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />

      {/* node A */}
      <circle cx="60" cy="80" r="22" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="60" cy="80" r="5" fill="var(--ink)" />
      <text x="60" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-soft)">
        A
      </text>

      {/* node B */}
      <circle cx="240" cy="80" r="22" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="240" cy="80" r="5" fill="var(--accent-rust)" />
      <text x="240" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-soft)">
        B
      </text>
    </svg>
  );
}
