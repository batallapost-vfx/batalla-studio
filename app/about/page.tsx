import NavbarInner from "@/components/NavbarInner";
import AboutBanner from "@/components/AboutBanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Batalla Studio",
  description:
    "Batalla Studio — equipo in-house de artistas especializados en 3D, IA, composición, color, motion y edición. Argentina, +15 años.",
};

export default function AboutPage() {
  return (
    <>
      <NavbarInner />
      <main>
        <AboutBanner />
      </main>
      <Footer />
    </>
  );
}
