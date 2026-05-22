import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SplitHero from "@/components/SplitHero";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false });

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <SplitHero />
        <SectionDivider number="01" label="Clients" />
        <Clients />
      </main>
      <Footer />
    </>
  );
}
