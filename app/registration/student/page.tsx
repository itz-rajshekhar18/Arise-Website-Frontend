import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StudentRegistrationWizard } from "@/components/registration/student/StudentRegistrationWizard";

export const metadata: Metadata = {
  title: "Student Squad Registration — ARISE//FEST 2026",
  description:
    "Register your student esports squad for ARISE//FEST 2026.",
};

export default function StudentRegistrationPage() {
  return (
    <Experience>
      <div className="site-shell student-registration">
        <Header />
        <main>
          <StudentRegistrationWizard />
        </main>
        <Footer />
      </div>
    </Experience>
  );
}
