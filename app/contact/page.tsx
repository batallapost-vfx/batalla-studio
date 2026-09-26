import type { Metadata } from "next";
import NavbarInner from "@/components/NavbarInner";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Batalla Studio para tu próximo proyecto de CGI, VFX o postproducción. Estudio con base en Rosario, Santa Fe, Argentina.",
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
