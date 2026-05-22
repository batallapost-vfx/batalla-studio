# Batalla Studio

Sitio web oficial de **Batalla Studio**, productora audiovisual de Rosario, Santa Fe, Argentina. El sitio presenta el trabajo del estudio en dos especialidades: **CGI Films** y **VFX & Post**.

## Stack

- [Next.js 14](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vimeo Player](https://github.com/vimeo/player.js) para la reproducción de videos
- [Lenis](https://lenis.studiofreight.com/) para smooth scroll

## Cómo correrlo localmente

Instalar dependencias:

```bash
npm install
```

Levantar el servidor de desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run dev:clean` | Limpia `.next` y arranca el servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Corre ESLint |
| `npm run typecheck` | Verifica los tipos con TypeScript |

## Estructura

```
app/             → Rutas (Home, CGI Films, VFX & Post, Portfolio, About, Contact)
components/      → Componentes React reutilizables
lib/             → Helpers (integración con Vimeo, etc.)
public/          → Assets estáticos (logos, imágenes)
```

## Contacto

- **Web**: [batallapost.com](https://batallapost.com)
- **Email**: fede@batallapost.com
- **Instagram**: [@batallapost](https://www.instagram.com/batallapost/)
- **WhatsApp**: [+54 9 341 576 9931](https://wa.me/5493415769931)
