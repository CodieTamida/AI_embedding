/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["sharp", "onnxruntume-node"],
  },
};

export default nextConfig;
