import NavbarInner from "@/components/NavbarInner";
import AboutBanner from "@/components/AboutBanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sobre el estudio",
  description:
    "Batalla Studio, estudio de postproducción con base en Rosario, Argentina: equipo in-house de artistas especializados en 3D, IA, composición, color y motion. Más de 15 años de experiencia.",
  keywords: ["Batalla Studio", "estudio de postproducción", "estudio CGI Rosario", "equipo VFX Argentina"],
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
