import Image from "next/image";

interface RowImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

// colección de imágenes de Behance: filas justificadas (todas las de una fila a la misma
// altura, llenando el ancho). `rows` = cuántas imágenes van en cada fila, igual que en Behance.
// flex-grow proporcional al ancho/alto de cada imagen es lo que las iguala en altura.
export default function BehanceImageRows({ images, rows }: { images: RowImage[]; rows?: number[] }) {
  const counts = rows ?? Array.from({ length: Math.ceil(images.length / 3) }, (_, i) => Math.min(3, images.length - i * 3));
  const starts = counts.map((_, i) => counts.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div className="flex flex-col gap-1">
      {counts.map((n, r) => (
        <div key={r} className="flex gap-1">
          {images.slice(starts[r], starts[r] + n).map((img, j) => (
            <div key={j} className="min-w-0" style={{ flex: `${img.width / img.height} 1 0%` }}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="w-full h-auto block"
                unoptimized
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
