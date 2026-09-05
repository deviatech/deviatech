import { ReactNode } from "react";

interface SheetFrameProps {
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

const CORNER_STYLES: Record<"tl" | "tr" | "bl" | "br", string> = {
  tl: "top-0 left-0 border-t-2 border-l-2 origin-top-left",
  tr: "top-0 right-0 border-t-2 border-r-2 origin-top-right",
  bl: "bottom-0 left-0 border-b-2 border-l-2 origin-bottom-left",
  br: "bottom-0 right-0 border-b-2 border-r-2 origin-bottom-right",
};

function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  return (
    <span
      aria-hidden="true"
      data-corner
      className={`absolute h-4 w-4 border-ink ${CORNER_STYLES[position]}`}
    />
  );
}

export default function SheetFrame({
  number,
  label,
  children,
  className = "",
  id,
}: SheetFrameProps) {
  return (
    <section
      id={id}
      data-snap-section
      className={`relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 md:py-24 ${className}`}
    >
      <div className="relative border border-line-grid px-4 py-10 md:px-10 md:py-16">
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />
        <span
          className="absolute -top-3 left-4 bg-paper px-2 font-mono text-xs tracking-wide text-ink-soft"
        >
          SHEET {number} — {label}
        </span>
        {children}
      </div>
    </section>
  );
}
