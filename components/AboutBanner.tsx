export default function AboutBanner() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <video
        src="/videos/banner-web-about-clean.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 w-full px-8 md:px-20 lg:px-28 py-32">
        <div className="max-w-xl" style={{ color: "#4D2D21" }}>
          <p className="text-lg md:text-xl leading-relaxed mb-6 font-light">
            Batalla es un equipo in-house de artistas especializados en 3D, IA, composición, color, motion y edición. Con base en Argentina y más de 15 años de experiencia en la industria audiovisual, trabajamos con clientes de México, LATAM, Estados Unidos, España y otros mercados.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-8 font-light">
            Nos involucramos desde el inicio de cada proyecto, desarrollando concepts, búsquedas visuales y propuestas creativas que ayudan a potenciar su alcance. Cada proyecto recibe lo mejor del equipo: ideas, criterio y la experiencia necesaria para llevarlo donde tiene que llegar.
          </p>
          <p className="font-playfair text-2xl md:text-3xl leading-snug italic">
            Cumplimos con las entregas en tiempo y forma. Siempre.
          </p>
        </div>
      </div>
    </section>
  );
}
