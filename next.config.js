/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Next.js 14
  swcMinify: true,
  experimental: {
    // Removido appDir ya que es estable en Next.js 14
  },
}

module.exports = nextConfig
