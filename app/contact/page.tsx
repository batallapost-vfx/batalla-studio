import type { Metadata } from "next";
import NavbarInner from "@/components/NavbarInner";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Batalla Studio",
  description: "Contactanos para tu próximo proyecto de CGI y VFX. Rosario, Santa Fe, Argentina.",
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
