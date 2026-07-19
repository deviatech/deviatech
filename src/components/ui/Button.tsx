import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-body text-sm font-medium transition-[transform,box-shadow,border-color,background-color] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber";
  const variants: Record<string, string> = {
    primary:
      "bg-accent-amber text-ink hover:-translate-y-0.5 hover:shadow-md",
    secondary:
      "border border-ink text-ink hover:-translate-y-0.5 hover:border-accent-rust hover:text-accent-rust",
  };

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
