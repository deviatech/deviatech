import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-[0.9375rem] font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--tl-primary)] text-white hover:bg-[var(--tl-primary-hover)] active:bg-[var(--tl-primary-active)]",
  secondary:
    "border border-[var(--tl-border-strong)] bg-transparent text-[var(--tl-text)] hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]",
};

interface TlLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function TlLinkButton({ href, variant = "primary", children, className = "", ...rest }: TlLinkButtonProps) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

interface TlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function TlButton({ variant = "primary", children, className = "", ...rest }: TlButtonProps) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
