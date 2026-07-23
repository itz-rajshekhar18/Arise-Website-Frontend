import { Access } from "@/components/Access";
import { Arenas } from "@/components/Arenas";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Partners } from "@/components/Partners";
import { Protocols } from "@/components/Protocols";
import { Schedule } from "@/components/Schedule";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <Experience>
      <div className="site-shell">
        <Header />
        <main id="top">
          <Hero />
          <Marquee />
          <Arenas />
          <Stats />
          <Schedule />
          <Partners />
          <Protocols />
          <Access />
        </main>
        <Footer />
      </div>
    </Experience>
  );
}
