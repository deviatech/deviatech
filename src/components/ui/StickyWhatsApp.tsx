import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function StickyWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(site.whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-amber text-ink shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-rust md:hidden"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
