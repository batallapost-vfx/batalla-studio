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

export default async function Home() {
  const videos = await getPortfolioVideos();

  return (
    <>
      <IntroAnimation />
      <main>
        <HomeHero />
        <Showreel />
        <FeaturedGrid videos={videos} />
        <SectionDivider className="mb-10" />
        <PortfolioGrid videos={videos} />
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
