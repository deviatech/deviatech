import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import SignatureIllustration from "@/components/ui/SignatureIllustration";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <SheetFrame number="01" label="HERO" id="hero">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-wide text-ink-soft">LAHORE, PAKISTAN</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-[4rem]">
            From idea to launched.
          </h1>
          <p className="mt-6 max-w-md font-body text-lg text-ink-soft">
            DeviaTech builds online stores for local businesses and MVPs for
            startups — designed, built, and shipped in Lahore.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={buildWhatsAppLink(site.whatsappDefaultMessage)} target="_blank" rel="noopener noreferrer">
              Start on WhatsApp
            </Button>
            <Button href="#work" variant="secondary">
              See our work
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <SignatureIllustration />
        </div>
      </div>
    </SheetFrame>
  );
}
