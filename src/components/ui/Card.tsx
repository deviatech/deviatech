import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`reveal-card rounded-sm border border-line-grid bg-surface p-6 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
