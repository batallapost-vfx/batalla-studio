import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { PROJECTS, projectSlug } from "@/lib/projects";
import { getPortfolioVideos } from "@/lib/portfolio";

// link propio de cada trabajo (www.studiobatalla.com/takis): la home con ese trabajo abierto
function findProject(slug: string) {
  return PROJECTS.find((p) => projectSlug(p.name) === slug);
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p.name) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = findProject(params.slug);
  if (!project) return {};
  const video = (await getPortfolioVideos()).find((v) => v.slug === params.slug);
  const image = video?.thumbnail_large;
  const description = `${project.name} — proyecto de Batalla Studio, estudio de CGI, VFX y postproducción de Rosario, Argentina.`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/${params.slug}` },
    openGraph: {
      type: "website",
      url: `/${params.slug}`,
      title: `${project.name} — Batalla Studio`,
      description,
      ...(image && { images: [{ url: image, alt: project.name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Batalla Studio`,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  if (!findProject(params.slug)) notFound();
  return <HomePage openSlug={params.slug} />;
}
