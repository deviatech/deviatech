import Hero from "@/components/sections/Hero";
import TwoTracks from "@/components/sections/TwoTracks";
import HowItWorks from "@/components/sections/HowItWorks";
import Work from "@/components/sections/Work";
import TechStack from "@/components/sections/TechStack";
import Founder from "@/components/sections/Founder";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import SectionSnap from "@/components/layout/SectionSnap";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <SectionSnap />
      <Hero />
      <TwoTracks />
      <HowItWorks />
      <Work />
      <TechStack />
      <Founder />
      <Faq />
      <Contact />
    </>
  );
}
