import { Suspense } from "react";
import dynamic from "next/dynamic";
import HomeHero from "@/components/HomeHero";
import Showreel from "@/components/Showreel";
import FeaturedGrid from "@/components/FeaturedGrid";
import AboutBanner from "@/components/AboutBanner";
import PortfolioGrid from "@/components/PortfolioGrid";
import ProjectModalHost from "@/components/ProjectModalHost";
import Clients from "@/components/Clients";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { getPortfolioVideos } from "@/lib/portfolio";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });

// los proyectos (Vimeo + Behance) tardan en traerse: la home se muestra sin esperarlos
// y esta sección llega después por streaming
async function Projects({ openSlug }: { openSlug?: string }) {
  const videos = await getPortfolioVideos();
  return (
    <>
      <FeaturedGrid videos={videos} />
      <SectionDivider className="mb-10" />
      <PortfolioGrid videos={videos} initialLimit={10} />
      <ProjectModalHost videos={videos} initialSlug={openSlug} />
    </>
  );
}

// home completa; con openSlug (entrada directa por el link de un trabajo, /slug) arranca con
// ese trabajo abierto y sin la animación de intro, que taparía el proyecto que se compartió
export default function HomePage({ openSlug }: { openSlug?: string }) {
  return (
    <>
      {!openSlug && <IntroAnimation />}
      <main>
        <HomeHero skipIntro={Boolean(openSlug)} />
        <Showreel />
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          <Projects openSlug={openSlug} />
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
