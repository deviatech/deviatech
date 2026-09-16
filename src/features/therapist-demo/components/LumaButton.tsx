import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "../styles/luma.module.css";

type Variant = "sage" | "charcoal" | "outline" | "onCharcoal";

const variantClass: Record<Variant, string> = {
  sage: styles.btnSage,
  charcoal: styles.btnCharcoal,
  outline: styles.btnOutline,
  onCharcoal: styles.btnOnCharcoal,
};

type LinkProps = {
  as?: "link";
  variant?: Variant;
  children: ReactNode;
  className?: string;
  href: string;
  anchorProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
};

type ButtonProps = {
  as: "button";
  variant?: Variant;
  children: ReactNode;
  className?: string;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
};

export default function LumaButton(props: LinkProps | ButtonProps) {
  const { variant = "sage", children, className } = props;
  const classes = `${styles.btn} ${variantClass[variant]} ${className ?? ""}`;

  if (props.as === "button") {
    return (
      <button className={classes} {...props.buttonProps}>
        {children}
      </button>
    );
  }

  return (
    <Link href={props.href} className={classes} {...props.anchorProps}>
      {children}
    </Link>
  );
}
