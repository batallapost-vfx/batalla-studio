import { Suspense } from "react";
import dynamic from "next/dynamic";
import HomeHero from "@/components/HomeHero";
import Showreel from "@/components/Showreel";
import FeaturedGrid from "@/components/FeaturedGrid";
import AboutBanner from "@/components/AboutBanner";
import PortfolioGrid from "@/components/PortfolioGrid";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { getPortfolioVideos } from "@/lib/portfolio";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });

// los proyectos (Vimeo + Behance) tardan en traerse: la home se muestra sin esperarlos
// y esta sección llega después por streaming
async function Projects() {
  const videos = await getPortfolioVideos();
  return (
    <>
      <FeaturedGrid videos={videos} />
      <SectionDivider className="mb-10" />
      <PortfolioGrid videos={videos} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <main>
        <HomeHero />
        <Showreel />
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          <Projects />
        </Suspense>
        <div id="about" className="scroll-mt-24">
          <AboutBanner />
        </div>
        <Clients />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
