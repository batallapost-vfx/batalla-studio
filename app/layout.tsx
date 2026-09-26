import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SmoothScroll    = dynamic(() => import("@/components/SmoothScroll"),    { ssr: false });
const CustomCursor    = dynamic(() => import("@/components/CustomCursor"),    { ssr: false });
const PageTransition  = dynamic(() => import("@/components/PageTransition"), { ssr: false });

const playfair = Fraunces({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = "https://studiobatalla.com";
const SITE_NAME = "Batalla Studio";
const DEFAULT_DESCRIPTION =
  "Batalla Studio es un estudio de postproducción, CGI y VFX con base en Rosario, Argentina, fundado en 2010. Producción in-house de 3D, animación, composición y color grading para marcas globales.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Estudio de CGI, VFX y Postproducción`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Batalla Studio",
    "Batalla Post",
    "batalla estudio",
    "estudio de postproducción",
    "estudio de postproducción Rosario",
    "estudio de postproducción Argentina",
    "estudio CGI",
    "estudio VFX",
    "productora CGI Argentina",
    "VFX Rosario",
    "VFX Argentina",
    "postproducción audiovisual",
    "animación 3D Rosario",
    "color grading",
    "composición y motion",
    "Rosario",
    "Santa Fe",
    "Argentina",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Estudio de CGI, VFX y Postproducción`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/images/batalla/Imagen_batalla_studio_v01.png",
        width: 2250,
        height: 1843,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Estudio de CGI, VFX y Postproducción`,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/batalla/Imagen_batalla_studio_v01.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "FmGLW4ke_WDcQvGSA50aZubwSeb5uzVUygSMDLEp3og",
  },
};

// Datos estructurados (JSON-LD) — ayuda a que Google entienda "Batalla Studio" como una
// entidad/marca puntual (nombre, rubro, ubicación) en vez de solo texto suelto en la página.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Batalla Post",
  url: SITE_URL,
  logo: `${SITE_URL}/images/batalla/logo_batalla.png`,
  image: `${SITE_URL}/images/batalla/Imagen_batalla_studio_v01.png`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rosario",
    addressRegion: "Santa Fe",
    addressCountry: "AR",
  },
  sameAs: [
    "https://vimeo.com/batallapost",
    "https://www.instagram.com/batallapost/",
    "https://www.behance.net/batallapost",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className="antialiased bg-studio-bg text-cream">
        <SmoothScroll />
        <CustomCursor />
        <PageTransition />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
