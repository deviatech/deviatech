import SheetFrame from "@/components/ui/SheetFrame";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { tracks, sectionEyebrow, therapistServiceLink } from "@/content/tracks";
import Link from "next/link";

const serviceLinks = [
  "/shopify-development-lahore",
  "/mvp-development",
];

export default function TwoTracks() {
  return (
    <SheetFrame number="02" label="TWO TRACKS" id="services">
      <p className="font-mono text-xs tracking-wide text-ink-soft">{sectionEyebrow}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {tracks.map((track, index) => (
          <Card key={track.name}>
            <h2 className="font-display text-xl font-semibold text-ink">
              <Link href={serviceLinks[index]} className="hover:text-accent-rust">
                {track.name}
              </Link>
            </h2>
            <p className="mt-2 font-body text-lg font-medium text-ink">{track.headline}</p>
            <p className="mt-3 font-body text-ink-soft">{track.copy}</p>
            <p className="mt-4 font-mono text-xs text-accent-rust">{track.startingPrice}</p>
            <Button
              href={buildWhatsAppLink(`Hi DeviaTech, I want to talk about ${track.name}.`)}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="service_cta_click"
              data-ga-label={track.name}
              className="mt-6"
            >
              {track.cta}
            </Button>
          </Card>
        ))}
      </div>
      <p className="mt-6 font-body text-sm text-ink-soft">
        {therapistServiceLink.lead}{" "}
        <Link
          href={therapistServiceLink.href}
          className="font-medium text-accent-rust underline decoration-accent-rust/40 underline-offset-4 hover:decoration-accent-rust"
        >
          {therapistServiceLink.label}
        </Link>
      </p>
    </SheetFrame>
  );
}
