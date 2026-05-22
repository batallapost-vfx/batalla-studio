# Batalla Studio — Contexto del Proyecto

## Overview
Sitio web de Batalla Studio, productora audiovisual de Rosario, Santa Fe, Argentina. Next.js 14 App Router. El sitio presenta dos especialidades: CGI Films y VFX & Post.

## Stack
- **Next.js 14** App Router (server + client components)
- **TypeScript**
- **Tailwind CSS**
- **Fuentes**: Playfair Display (`font-playfair`) para títulos y botones, sans-serif para cuerpo
- **Videos**: Vimeo (se obtienen via `lib/vimeo.ts` → `getVimeoVideos()`)

## Colores de marca
| Token | Hex | Uso |
|-------|-----|-----|
| `#1a1008` | Studio dark brown | Fondo principal, bg del body |
| `#F7E1B1` | Cream | Texto principal, logo claro |
| `#CD8641` | Gold | Acentos, divisores, hover |
| `#B65939` | Terracotta | Gradiente rainbow buttons |

En Tailwind: `text-cream`, `text-gold`, `bg-gold`, `border-gold`. Revisar `tailwind.config.ts` para tokens exactos.

## Estructura de páginas
```
app/
  page.tsx              → Home: IntroAnimation + Navbar + SplitHero + Clients + BannerVideo + Footer
  cgi-films/page.tsx    → Categoría CGI: NavbarInner + header + CategoryGrid + Footer
  vfx-post/page.tsx     → Categoría VFX: NavbarInner + header + CategoryGrid + Footer
  portfolio/page.tsx    → Todos los proyectos: NavbarInner + PortfolioGrid + Footer
  about/page.tsx        → Sobre el estudio: NavbarInner + contenido + BannerVideo + Footer
  contact/page.tsx      → Contacto: NavbarInner + datos + Footer
  error.tsx             → Requerido por Next.js App Router (evita refresh infinito)
  global-error.tsx      → Root error boundary
  globals.css           → Estilos globales, cursor, rainbow button CSS, 3D logos, corner ornaments
```

## Componentes clave

### `components/Navbar.tsx`
- Solo para la **home**
- Logo `Batalla_cremita.png` (grande, 140px, baja 52px) cuando está arriba del todo
- Logo `Batalla_marron.png` (46px) cuando se scrollea — cross-fade entre ambos
- El header es transparente arriba y aparece con `rgba(247,225,177,0.70)` + blur al scrollear
- Escucha el evento custom `hero:hover` → cuando está activo, baja el logo a 40% de opacidad

### `components/NavbarInner.tsx`
- Para páginas internas (categorías, portfolio, about, contact)
- Logo `Batalla_marron.png` (34px) a la izquierda — al clickear vuelve a home via TransitionLink
- Links a la derecha: Portfolio / About / Contact — usan TransitionLink, activo en gold

### `components/SplitHero.tsx`
- Hero de la home, pantalla dividida 50/50 (65/35 al hacer hover)
- Panel izquierdo → `/cgi-films`, panel derecho → `/vfx-post`
- Ambos paneles son `TransitionLink` para activar la transición animada
- Videos: opacidad 50% en reposo, 100% al hover
- Al hacer hover dispara evento `hero:hover` (para que Navbar dimee el logo)
- Botones "Ver proyectos" usan `RainbowButton` con `isActive` — al activarse: escala 1.25, rainbow animation corre, texto oscuro

### `components/ui/rainbow-borders-button.tsx`
- Botón con borde animado rainbow usando colores de marca
- Clase CSS `batalla-border` + `is-active` (definidas en globals.css)
- `isActive`: escala 1.25, color texto `#1a1008`, border rainbow animado + glow blur
- Sin active: sin borde visible, texto cream, escala normal
- `width: fit-content` para no estirar en flex columns

### `components/PageTransition.tsx`
- Animación de transición entre páginas: barrido de paneles de abajo hacia arriba
- Panel 1: cream (`#F7E1B1`), Panel 2: gold (`#CD8641`) con logo `Batalla_cremita.png` centrado (240px)
- **NO anima al cargar la página por primera vez** — solo entre navegaciones
- Escucha evento `transition:navigate` → cover() → router.push → reveal()
- SPEED=500ms, LAG=140ms

### `components/TransitionLink.tsx`
- Wrapper de `<a>` que intercepta clicks internos y dispara `transition:navigate`
- Links externos, anclas (#), mailto y tel pasan normalmente
- Usado en todos los links de navegación interna

### `components/CategoryGrid.tsx`
- Grid de videos **sin márgenes laterales** (llega al borde de la pantalla)
- Al hover: nombre del proyecto aparece centrado, sin botón de play visible
- Modal de reproducción Vimeo: `max-w-[72vw]`

### `components/PortfolioGrid.tsx`
- Igual que CategoryGrid pero con filtros por categoría
- Header/filtros con `px-6 md:px-12`

### `components/CustomCursor.tsx`
- Cuadrado de 10×10px color cream, `mix-blend-mode: difference`
- Gira 180° acumulativos al hacer click con ease in/out (0.5s)

### `components/Footer.tsx`
- Logo 67px (Batalla_cremita o marron según fondo)
- Tagline y copyright mencionan "Rosario, Santa Fe, Argentina"

## Eventos custom del browser
| Evento | Quien lo dispara | Quien lo escucha |
|--------|-----------------|-----------------|
| `hero:hover` `{ active: boolean }` | SplitHero (enter/leave panel) | Navbar (dimea logo) |
| `transition:navigate` `{ href: string }` | TransitionLink (click) | PageTransition (cover→navigate→reveal) |

## CSS global destacado (`globals.css`)
- `cursor: none !important` en todo — cursor custom via CustomCursor
- `.batalla-border` / `.batalla-border.is-active` — rainbow button animation
- `.clients-grid` / `.client-logo-item` — 3D hover en logos de clientes (perspective + translateZ)
- `.corner-ornament` — ornamentos de esquinas (tl, tr, bl, br)
- `@keyframes batallaRainbow` — animación del borde, 20s, paused por defecto

## Info del estudio
- **Nombre**: Batalla Studio
- **Ubicación**: Rosario, Santa Fe, Argentina (NO Buenos Aires)
- **Fundado**: 2010
- **Contacto EP**: Fede Lo Cascio — fede@batallapost.com
- **WhatsApp**: https://wa.me/5493415769931
- **Instagram**: https://www.instagram.com/batallapost/
- **Vimeo**: cuenta del estudio

## Convenciones importantes
- Todos los links internos usan `TransitionLink`, nunca `next/link` directamente en navegación
- Fuente de títulos: `font-playfair` (clase Tailwind)
- Textos de micro-labels: `text-[0.6rem] uppercase tracking-[0.35em]`
- Siempre "Rosario, Santa Fe, Argentina" — nunca "Buenos Aires"
- `cursor: none` en toda la web — no agregar cursors a elementos individuales salvo que sea `cursor: none`
- No agregar comentarios en el código salvo que el WHY sea no obvio
- Respuestas cortas y concisas, sin resúmenes al final
