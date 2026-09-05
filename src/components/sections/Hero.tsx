import SheetFrame from "@/components/ui/SheetFrame";
import Button from "@/components/ui/Button";
import SignatureIllustration from "@/components/ui/SignatureIllustration";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <div>
      <SheetFrame number="01" label="HERO" id="hero">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p data-hero-eyebrow className="font-mono text-xs tracking-wide text-ink-soft">
              LAHORE, PAKISTAN
            </p>
            <h1
              data-hero-heading
              className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-[4rem]"
            >
              Shopify Stores and Custom Software Built in Lahore
            </h1>
            <p data-hero-sub className="mt-6 font-display text-xl font-medium text-ink">
              From idea to launched.
            </p>
            <p data-hero-sub className="mt-3 max-w-md font-body text-lg text-ink-soft">
              DeviaTech builds online stores for local businesses and MVPs for
              startups — designed, built, and shipped in Lahore.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span data-hero-cta>
                <Button
                  href={buildWhatsAppLink(site.whatsappDefaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ga-event="whatsapp_click"
                  data-ga-label="hero"
                >
                  Start on WhatsApp
                </Button>
              </span>
              <span data-hero-cta>
                <Button href="#work" variant="secondary">
                  See our work
                </Button>
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <SignatureIllustration />
          </div>
        </div>
      </SheetFrame>
    </div>
  );
}
