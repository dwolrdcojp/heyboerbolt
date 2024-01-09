const path = require("node:path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _context) => {
    config.resolve.alias["jotai"] = path.resolve(
      __dirname,
      "node_modules/jotai",
    );
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
