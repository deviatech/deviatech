import Button from "@/components/ui/Button";
import ConnectionIllustration from "@/components/ui/ConnectionIllustration";
import { DOBATALK_URL } from "@/content/site";

export default function DobaTalkRail() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <section
        aria-labelledby="dobatalk-title"
        className="relative border border-line-grid px-4 py-10 md:px-10 md:py-14"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-ink"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-ink"
        />
        <span className="absolute -top-3 left-4 bg-paper px-2 font-mono text-xs tracking-wide text-ink-soft">
          FIG. 02 — DOBATALK
        </span>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-wide text-accent-rust">
              A PRODUCT BY DEVIATECH
            </p>
            <h2
              id="dobatalk-title"
              className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl"
            >
              DobaTalk
            </h2>
            <p className="mt-2 font-display text-lg font-medium text-ink">
              A simpler way to start therapy.
            </p>
            <p className="mt-3 max-w-md font-body text-ink-soft">
              Discover DobaTalk, a therapy-focused product built by the
              DeviaTech team.
            </p>
            <div className="mt-6">
              <Button
                href={DOBATALK_URL}
                className="group motion-reduce:hover:translate-y-0"
                data-ga-event="dobatalk_click"
                data-ga-label="home_rail"
              >
                Explore DobaTalk
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-150 motion-reduce:transition-none group-hover:translate-x-1"
                >
                  →
                </span>
              </Button>
              <p className="mt-2 font-body text-sm text-ink-soft">
                Explore our therapist website design service.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <ConnectionIllustration />
          </div>
        </div>
      </section>
    </div>
  );
}
