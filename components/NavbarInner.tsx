"use client";

import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About",     href: "/about"     },
  { label: "Contact",   href: "/contact"   },
];

export default function NavbarInner() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0"
      style={{
        // z-index 70 = viñeta global (globals.css) — por encima de eso para que no la oscurezca
        zIndex: 75,
        backgroundColor: "rgba(247,225,177,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(205,134,65,0.20)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo — izquierda, vuelve a home */}
        <TransitionLink href="/" className="select-none shrink-0">
          <Image
            src="/images/batalla/Batalla_marron.png"
            alt="Batalla Studio"
            width={161}
            height={77}
            className="w-auto"
            style={{ height: "34px" }}
            priority
          />
        </TransitionLink>

        {/* Links — derecha */}
        <div className="flex items-center gap-3 md:gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <TransitionLink
              key={href}
              href={href}
              className="inline-flex items-center px-3 py-3 text-[0.6rem] uppercase tracking-[0.35em] font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              style={{
                color: pathname === href ? "#CD8641" : "rgba(61,26,10,0.75)",
                minHeight: "44px",
              }}
            >
              {label}
            </TransitionLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
