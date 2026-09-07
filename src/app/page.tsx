import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Section } from "@/components/section";
import { Services } from "@/components/services";
import { PricingConfigurator } from "@/components/pricing-configurator";
import { Stats } from "@/components/stats";
import { Work } from "@/components/work";

/**
 * PLACEHOLDER HOMEPAGE — this is the Phase 0 skeleton.
 * Each build phase in BLUEPRINT.md replaces one section of this file with a
 * real component from src/components/. Do not delete this file's structure
 * wholesale in a single phase — build it up section by section so every
 * commit stays deployable.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Section id="services" title="Services">
        <Services />
      </Section>
      <Section id="pricing" title="Pricing">
        <PricingConfigurator />
      </Section>
      <Section id="work" title="Work">
        <Work />
      </Section>
      <Section id="about" title="About">
        <Stats />
      </Section>
      <Section id="contact" title="Contact" />
      <Footer />
    </>
  );
}
