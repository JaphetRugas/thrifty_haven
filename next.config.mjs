/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons8.com",
        port: "",
        pathname: "/preloaders/**",
      },
    ],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt", {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
