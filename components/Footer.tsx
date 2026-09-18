const SOCIAL_LINKS = [
  {
    label: "Vimeo",
    href: "https://vimeo.com/batallapost",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881l-1.9-6.989c-.713-2.587-1.47-3.88-2.273-3.88-.172 0-.796.37-1.864 1.12L0 7.229c1.196-1.047 2.375-2.098 3.552-3.143 1.61-1.388 2.806-2.099 3.594-2.148 1.897-.182 3.048 1.111 3.452 3.875.45 2.994.75 4.895.923 5.707.49 2.238 1.037 3.355 1.647 3.355.465 0 1.18-.735 2.12-2.209 1-1.543 1.499-2.715 1.499-3.521 0-1.399-.397-2.098-1.198-2.098-.43 0-.873.098-1.327.296 1.02-3.317 3.034-4.93 6.022-4.822 2.132.069 3.126 1.44 2.993 4.095z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/batallastudio",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/batallastudio",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/15">
      {/* Top ornamental line */}
      <div className="flex items-center px-10 md:px-20 pt-16 pb-0">
        <div
          className="flex-1 h-px opacity-20"
          style={{ background: "linear-gradient(to right, transparent, #CD8641)" }}
        />
        <div className="mx-4">
          <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-50" />
        </div>
        <div
          className="flex-1 h-px opacity-20"
          style={{ background: "linear-gradient(to left, transparent, #CD8641)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 flex flex-col items-center gap-10">
        {/* Logo */}
        <TransitionLink href="/" className="select-none">
          <Image
            src="/images/batalla/logo_batalla.png"
            alt="Batalla Studio"
            width={160}
            height={76}
            className="w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            style={{ height: "67px" }}
          />
        </TransitionLink>

        {/* Tagline */}
        <p className="text-cream/60 text-xs text-center tracking-[0.25em] font-light max-w-sm">
          CGI Films &amp; VFX Post Production · Rosario, Santa Fe, Argentina
        </p>

        {/* Social links */}
        <div className="flex items-center gap-8">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-cream/60 hover:text-gold transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gold/10" />

        {/* Copyright */}
        <p className="text-cream/55 text-[0.6rem] text-center uppercase tracking-[0.4em]">
          © 2025 Batalla Studio · Rosario, Santa Fe
        </p>
      </div>
    </footer>
  );
}
