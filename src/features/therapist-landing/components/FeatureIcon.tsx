import type { IconType } from "react-icons";

export default function FeatureIcon({ icon: Icon, className = "" }: { icon: IconType; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--tl-primary-soft)] text-[var(--tl-primary)] md:h-10 md:w-10 ${className}`}
    >
      <Icon size={19} />
    </span>
  );
}
