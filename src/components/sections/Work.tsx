import SheetFrame from "@/components/ui/SheetFrame";
import Card from "@/components/ui/Card";
import { work, workEyebrow } from "@/content/work";

export default function Work() {
  return (
    <SheetFrame number="04" label="WORK" id="work">
      <p className="font-mono text-xs tracking-wide text-ink-soft">{workEyebrow}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {work.map((item) => (
          <Card key={item.name}>
            <h3 className="font-display text-lg font-semibold text-ink">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber"
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </h3>
            <p className="mt-2 font-body text-sm text-ink-soft">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-accent-rust">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </SheetFrame>
  );
}
