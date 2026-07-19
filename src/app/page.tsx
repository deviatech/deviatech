import Hero from "@/components/sections/Hero";
import TwoTracks from "@/components/sections/TwoTracks";
import HowItWorks from "@/components/sections/HowItWorks";
import Work from "@/components/sections/Work";
import TechStack from "@/components/sections/TechStack";
import Founder from "@/components/sections/Founder";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import RevealSection from "@/components/ui/RevealSection";

export default function Home() {
  return (
    <>
      <Hero />
      <RevealSection>
        <TwoTracks />
      </RevealSection>
      <RevealSection>
        <HowItWorks />
      </RevealSection>
      <RevealSection>
        <Work />
      </RevealSection>
      <RevealSection>
        <TechStack />
      </RevealSection>
      <RevealSection>
        <Founder />
      </RevealSection>
      <RevealSection>
        <Faq />
      </RevealSection>
      <RevealSection>
        <Contact />
      </RevealSection>
    </>
  );
}
