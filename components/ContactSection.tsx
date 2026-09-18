"use client";

import { useState } from "react";
import SectionDivider from "@/components/SectionDivider";

const SOCIAL_LINKS = [
  { label: "Vimeo",     href: "https://vimeo.com/batallapost"           },
  { label: "Instagram", href: "https://www.instagram.com/batallapost/"  },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con backend / servicio de email
    setSent(true);
  }

  return (
    <section id="contact" className="scroll-mt-24">
      {/* Hero */}
      <div className="pt-36 pb-20 px-8 text-center">
        <p className="text-gold text-[0.6rem] uppercase tracking-[0.6em] mb-4">
          — Hablemos —
        </p>
        <h2 className="font-playfair font-bold text-cream leading-none mb-6 text-[clamp(3rem,8vw,6rem)]">
          Contact
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-px bg-gold opacity-35" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold opacity-65" />
          <div className="w-16 h-px bg-gold opacity-35" />
        </div>
      </div>

      <SectionDivider number="01" label="Get in touch" />

      <div className="max-w-4xl mx-auto px-8 pb-32 grid md:grid-cols-2 gap-16 items-start">
        {/* Left — form */}
        <div>
          <span className="text-gold text-[0.6rem] uppercase tracking-[0.5em] mb-6 block">
            Nuevo proyecto
          </span>
          {sent ? (
            <div className="py-12">
              <p className="font-playfair text-cream text-2xl mb-3">Mensaje enviado.</p>
              <p className="text-cream/60 text-sm font-light">Te contactamos a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-[0.55rem] uppercase tracking-[0.35em] text-cream/60">Nombre</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="bg-transparent border border-gold/20 focus:border-gold/60 outline-none px-4 py-3 text-cream text-sm transition-colors duration-300"
                  style={{ caretColor: "#CD8641" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-[0.55rem] uppercase tracking-[0.35em] text-cream/60">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="bg-transparent border border-gold/20 focus:border-gold/60 outline-none px-4 py-3 text-cream text-sm transition-colors duration-300"
                  style={{ caretColor: "#CD8641" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[0.55rem] uppercase tracking-[0.35em] text-cream/60">Mensaje</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="bg-transparent border border-gold/20 focus:border-gold/60 outline-none px-4 py-3 text-cream text-sm resize-none transition-colors duration-300"
                  style={{ caretColor: "#CD8641" }}
                />
              </div>
              <button
                type="submit"
                className="mt-2 px-8 py-3 border border-gold/50 text-gold text-[0.6rem] uppercase tracking-[0.35em] hover:bg-gold hover:text-studio-bg transition-all duration-300 self-start"
              >
                Enviar mensaje
              </button>
            </form>
          )}
        </div>

        {/* Right — info + redes */}
        <div className="flex flex-col gap-10 pt-2">
          <div>
            <p className="text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-3">Estudio</p>
            <p className="text-cream/55 text-sm leading-relaxed font-light">
              Rosario, Santa Fe, Argentina
            </p>
          </div>
          <div className="w-full h-px bg-gold/10" />
          <div>
            <p className="text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-3">Contacto</p>
            <p className="text-cream/70 text-sm font-light mb-1">Fede Lo Cascio — Executive Producer</p>
            <a
              href="mailto:fede@batallapost.com"
              className="text-cream/55 text-sm hover:text-gold transition-colors duration-300 font-light"
            >
              fede@batallapost.com
            </a>
          </div>
          <div className="w-full h-px bg-gold/10" />
          <div>
            <p className="text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-4">WhatsApp</p>
            <a
              href="https://wa.me/5493415769931"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-gold/40 text-gold text-[0.6rem] uppercase tracking-[0.35em] hover:bg-gold hover:text-studio-bg transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribinos
            </a>
          </div>
          <div className="w-full h-px bg-gold/10" />
          <div>
            <p className="text-gold text-[0.6rem] uppercase tracking-[0.45em] mb-5">Redes</p>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/60 text-[0.6rem] uppercase tracking-[0.35em] hover:text-gold transition-colors duration-300 flex items-center gap-2"
                >
                  <span className="w-4 h-px bg-current" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
