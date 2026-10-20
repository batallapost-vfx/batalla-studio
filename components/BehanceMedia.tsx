import Image from "next/image";

// pieza de un proyecto de Behance: los GIFs se convirtieron a video (pesan ~15x menos y se
// ven igual), así que si hay `video` se muestra en loop sin sonido, como un GIF
export default function BehanceMedia({
  src,
  video,
  alt,
  width,
  height,
  sizes,
}: {
  src: string;
  video?: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}) {
  if (video) {
    return (
      <video
        src={video}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className="w-full h-auto block"
      />
    );
  }
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="w-full h-auto block" unoptimized />;
}
