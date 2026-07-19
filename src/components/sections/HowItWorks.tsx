import SheetFrame from "@/components/ui/SheetFrame";
import { howItWorks } from "@/content/tracks";

export default function HowItWorks() {
  return (
    <SheetFrame number="03" label="HOW IT WORKS">
      <div className="grid gap-8 md:grid-cols-4">
        {howItWorks.map((item) => (
          <div key={item.step}>
            <h3 className="font-display text-lg font-semibold text-ink">{item.step}</h3>
            <p className="mt-2 font-body text-sm text-ink-soft">{item.copy}</p>
          </div>
        ))}
      </div>
    </SheetFrame>
  );
}
