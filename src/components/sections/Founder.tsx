import SheetFrame from "@/components/ui/SheetFrame";
import { founder } from "@/content/founder";

export default function Founder() {
  return (
    <SheetFrame number="06" label="FOUNDER" id="about">
      <p className="font-mono text-xs tracking-wide text-ink-soft">WHO&apos;S BUILDING THIS</p>
      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start">
        <div
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-ink font-display text-xl font-semibold text-ink"
        >
          {founder.initials}
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">{founder.name}</h2>
          <p className="font-mono text-xs text-accent-rust">{founder.role}</p>
          <div className="mt-4 flex max-w-2xl flex-col gap-4 font-body text-ink-soft">
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}
