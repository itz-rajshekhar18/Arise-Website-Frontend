import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgrammingRegistration } from "@/components/registration/programming/ProgrammingRegistration";

export const metadata: Metadata = {
  title: "Competitive Programming Registration — ARISE//FEST 2026",
  description:
    "Register a three or four person team for the ARISE//FEST competitive programming challenge.",
};

export default function ProgrammingRegistrationPage() {
  return (
    <Experience>
      <div className="site-shell programming-registration">
        <Header />
        <main>
          <ProgrammingRegistration />
        </main>
        <Footer />
      </div>
    </Experience>
  );
}
