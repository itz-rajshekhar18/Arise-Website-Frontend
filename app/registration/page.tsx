import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RegistrationEntryPortal } from "@/components/registration/RegistrationEntryPortal";
import { RegistrationPortalHero } from "@/components/registration/RegistrationPortalHero";

export const metadata: Metadata = {
  title: "Choose Your Entry — ARISE//FEST 2026",
  description:
    "Select the registration path that fits your role, goals, and festival experience.",
};

export default function RegistrationPortalPage() {
  return (
    <Experience>
      <div className="site-shell registration-portal">
        <Header />
        <main>
          <RegistrationPortalHero />
          <RegistrationEntryPortal />
        </main>
        <Footer />
      </div>
    </Experience>
  );
}
