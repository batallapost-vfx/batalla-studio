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
    href: "https://www.instagram.com/batallastudio_/",
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
    label: "Behance",
    href: "https://www.behance.net/batallastudio",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/batalla-studio/",
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
            src="/images/batalla/Batalla_cremita.png"
            alt="Batalla Studio"
            width={160}
            height={76}
            className="w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            style={{ height: "67px" }}
          />
        </TransitionLink>

        {/* Tagline */}
        <div className="text-center">
          <p className="text-cream/60 text-xs tracking-[0.25em] font-light max-w-sm">
            CGI Films &amp; VFX Post Production
          </p>
          <p className="text-cream/45 text-[0.65rem] tracking-[0.25em] font-light mt-1.5">
            Based in Argentina
          </p>
        </div>

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
          © 2026 Batalla Studio
        </p>
      </div>
    </footer>
  );
}
