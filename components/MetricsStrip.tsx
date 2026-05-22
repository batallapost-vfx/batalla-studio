const METRICS = [
  { value: "15",   unit: "Years",      caption: "Since 2010" },
  { value: "11",   unit: "Countries",  caption: "Shipped from Rosario" },
  { value: "100%", unit: "Digital",    caption: "No shoot required" },
];

export default function MetricsStrip() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
        {METRICS.map((m, i) => (
          <div
            key={m.unit}
            className={`flex flex-col items-center text-center md:px-8 ${
              i > 0 ? "md:border-l md:border-gold/15" : ""
            }`}
          >
            <span
              className="font-playfair font-medium text-cream leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              {m.value}
            </span>
            <span className="text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-2">
              {m.unit}
            </span>
            <span className="text-cream/55 text-[0.6rem] uppercase tracking-[0.3em]">
              {m.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
