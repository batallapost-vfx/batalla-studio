import Image from "next/image";

const CLIENTS = [
  { name: "KIA", file: "Logo_Kia.png" },
  { name: "Ford", file: "Logo_Ford.png" },
  { name: "KFC", file: "Logo_KFC.png" },
  { name: "Nestlé", file: "Logo_Nestle.png" },
  { name: "Gillette", file: "Logo_Gillete.png" },
  { name: "Honda", file: "Logo_Honda.png" },
  { name: "Nescafé", file: "Logo_Nescafe.png" },
  { name: "Bimbo", file: "Logo_Bimbo.png" },
  { name: "Takis", file: "Logo_Takis.png" },
  { name: "Schneider", file: "Logo_Schneider.png" },
  { name: "Activia", file: "Logo_Activia.png" },
  { name: "Imperial", file: "LOGO__Imperial.png" },
  { name: "Amazon Prime Video", file: "LOGO__Amazon Primer Video.png" },
  { name: "Adidas", file: "LOGO__Adidas.png" },
  { name: "Drean", file: "LOGO__Drean.png" },
  { name: "Hyundai", file: "LOGO__Hyundai.png" },
  { name: "Disney", file: "LOGO__Disney.png" },
  { name: "Coca-Cola", file: "LOGO__Coca Cola.png" },
  { name: "Bagley", file: "LOGO__Bagley.png" },
  { name: "Juegos Olímpicos", file: "LOGO__JJOO.png" },
  { name: "Mabe", file: "LOGO__Mabe.png" },
  { name: "McDonald's", file: "LOGO__McDonnals.png" },
  { name: "Netflix", file: "LOGO__Netflix.png" },
  { name: "Mercado Pago", file: "LOGO__Mercado Pago.png" },
  { name: "Marinela", file: "LOGO__Marinela.png" },
  { name: "Telcel", file: "LOGO__Telcel.png" },
];

export default function Clients() {
  return (
    <section id="clients" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
          — Trusted By —
        </p>
        <h2 className="font-playfair font-bold text-cream text-4xl md:text-5xl tracking-wide">
          Clients
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-12 h-px bg-gold opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold opacity-70" />
          <div className="w-12 h-px bg-gold opacity-40" />
        </div>
      </div>

      <div className="clients-grid grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-px border border-gold/10">
        {CLIENTS.map((client) => (
          <div
            key={client.name}
            className="client-logo-item group flex items-center justify-center py-8 px-6 border border-gold/10"
          >
            <Image
              src={`/images/clients/${client.file}`}
              alt={client.name}
              width={120}
              height={50}
              className="object-contain max-h-10 w-auto brightness-0 invert opacity-40 group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
