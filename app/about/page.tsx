import NavbarInner from "@/components/NavbarInner";
import AboutBanner from "@/components/AboutBanner";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description:
    "Batalla Studio is a post-production studio based in Rosario, Argentina: an in-house team of artists specialized in 3D, AI, compositing, color and motion, with over 15 years of experience.",
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
