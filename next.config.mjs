/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
      },
    ],
  },
  // links de trabajos que cambiaron de nombre: el link viejo sigue funcionando
  async redirects() {
    return [{ source: "/mc-donals", destination: "/mcdonalds", statusCode: 301 }];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Desactiva el cache de filesystem en dev para evitar
      // la corrupción cuando se compila con el servidor corriendo
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
