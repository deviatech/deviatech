import SheetFrame from "@/components/ui/SheetFrame";
import { faqs } from "@/content/faq";

export default function Faq() {
  return (
    <SheetFrame number="07" label="FAQ">
      <p className="font-mono text-xs tracking-wide text-ink-soft">COMMON QUESTIONS</p>
      <div className="mt-8 flex flex-col divide-y divide-line-grid border-t border-b border-line-grid">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber">
              {faq.question}
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-lg text-accent-amber transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 font-body text-sm text-ink-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
    </SheetFrame>
  );
}
