/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev) {
      config.devtool = 'eval-source-map'; 
    } else if (!isServer) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;