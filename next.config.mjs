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
    ],
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
