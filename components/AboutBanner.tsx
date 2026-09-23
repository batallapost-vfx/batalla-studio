import Image from "next/image";

export default function AboutBanner() {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-14 lg:pb-10"
      style={{ backgroundColor: "#F7E1B1" }}
    >
      <div className="relative z-10 w-full max-w-[1900px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Texto — código, no imagen */}
          <div className="w-full lg:w-[41%] lg:shrink-0 text-center lg:text-left" style={{ color: "#49271A" }}>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-6 font-light">
              Batalla es un equipo in-house de artistas especializados en 3D, IA, composición,
              color, motion y edición. Con base en Argentina y más de 15 años de experiencia en
              la industria audiovisual, trabajamos con clientes de México, LATAM, Estados
              Unidos, España y otros mercados.
            </p>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed mb-8 font-light">
              Nos involucramos desde el inicio de cada proyecto, desarrollando concepts,
              búsquedas visuales y propuestas creativas que ayudan a potenciar su alcance. Cada
              proyecto recibe lo mejor del equipo: ideas, criterio y la experiencia necesaria
              para llevarlo donde tiene que llegar.
            </p>
            <p className="font-playfair text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-snug italic">
              Cumplimos con las entregas en tiempo y forma. Siempre.
            </p>
          </div>

          {/* Ilustración — ya incluye "Creativity & Art". Ancho en % de un contenedor con tope
              (1900px) en vez de flex-1 libre, para que escale a la par del texto sin desbordarse
              en pantallas ultra anchas */}
          <div className="w-full lg:w-[49%] lg:shrink-0">
            <Image
              src="/images/batalla/Imagen_batalla_studio_v01.png"
              alt="Batalla Studio — Creativity & Art"
              width={2250}
              height={1843}
              sizes="(min-width: 1024px) 49vw, 90vw"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="flex justify-center mt-10 lg:mt-14">
          <Image
            src="/images/batalla/Since_2010.png"
            alt="Since 2010"
            width={250}
            height={28}
            className="w-[100px] sm:w-[120px] lg:w-[150px] xl:w-[170px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
