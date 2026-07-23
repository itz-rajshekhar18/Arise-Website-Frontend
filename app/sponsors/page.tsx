import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PartnershipTiers } from "@/components/sponsors/PartnershipTiers";
import { SponsorForm } from "@/components/sponsors/SponsorForm";
import { SponsorNetwork } from "@/components/sponsors/SponsorNetwork";
import { SponsorsHero } from "@/components/sponsors/SponsorsHero";

export const metadata: Metadata = {
  title: "Partner with ARISE//FEST 2026",
  description:
    "Explore sponsorship tiers and connect your brand with the next generation of gaming, technology, and digital culture.",
};

export default function SponsorsPage() {
  return (
    <Experience>
      <div className="site-shell sponsor-site">
        <Header />
        <main>
          <SponsorsHero />
          <PartnershipTiers />
          <SponsorNetwork />
          <SponsorForm />
        </main>
        <Footer />
      </div>
    </Experience>
  );
}
