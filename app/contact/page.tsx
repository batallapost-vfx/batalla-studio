import type { Metadata } from "next";
import NavbarInner from "@/components/NavbarInner";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Batalla Studio for your next CGI, VFX or post-production project. Studio based in Rosario, Santa Fe, Argentina.",
  keywords: ["contacto Batalla Studio", "presupuesto VFX", "estudio de postproducción Rosario"],
};

export default function ContactPage() {
  return (
    <>
      <NavbarInner />
      <main>
        <ContactSection />
        <SectionDivider number="02" label="Studio" />
      </main>
      <Footer />
    </>
  );
}
