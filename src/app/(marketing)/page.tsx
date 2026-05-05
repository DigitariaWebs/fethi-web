import { MarketingHero } from "@/components/marketing/sections/Hero";
import { Pillars } from "@/components/marketing/sections/Pillars";
import { HowItWorks } from "@/components/marketing/sections/HowItWorks";
import { Neighborhoods } from "@/components/marketing/sections/Neighborhoods";
import { Voices } from "@/components/marketing/sections/Voices";
import { FinalCTA } from "@/components/marketing/sections/CTA";

export default function HomePage() {
  return (
    <>
      <MarketingHero />
      <Pillars />
      <HowItWorks />
      <Neighborhoods />
      <Voices />
      <FinalCTA />
    </>
  );
}
