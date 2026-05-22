import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
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

export const metadata: Metadata = {
  title: "Batalla Studio — CGI Films & VFX Post Production",
  description:
    "Rosario-based CGI Films and VFX & Post Production studio founded in 2010. Crafting visual stories for global brands.",
  keywords: "CGI films, VFX, post production, Rosario, Santa Fe, Argentina, visual effects, animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-studio-bg text-cream">
        <SmoothScroll />
        <CustomCursor />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
