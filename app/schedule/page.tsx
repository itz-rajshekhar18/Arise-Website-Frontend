import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScheduleBoard } from "@/components/schedule/ScheduleBoard";
import { ScheduleHero } from "@/components/schedule/ScheduleHero";
import { ScheduleInfo } from "@/components/schedule/ScheduleInfo";
import { ScheduleSidebar } from "@/components/schedule/ScheduleSidebar";
import { VenuePanel } from "@/components/schedule/VenuePanel";

export const metadata: Metadata = {
  title: "Event Schedule — ARISE//FEST 2026",
  description:
    "Explore all three days of ARISE//FEST 2026 sessions, arenas, workshops, and live transmissions.",
};

export default function EventSchedulePage() {
  return (
    <Experience>
      <div className="site-shell schedule-site">
        <Header />
        <main className="schedule-dashboard">
          <ScheduleSidebar />
          <div className="schedule-page">
            <ScheduleHero />
            <ScheduleBoard />
            <VenuePanel />
            <ScheduleInfo />
            <Footer />
          </div>
        </main>
      </div>
    </Experience>
  );
}
