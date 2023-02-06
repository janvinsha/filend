/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.experiments = { asyncWebAssembly: true, layers: true };
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  experiments: {
    asyncWebAssembly: true,
    buildHttp: true,
    layers: true,
    lazyCompilation: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
  },
  images: {
    loader: "akamai",
    path: "",
  },
  trailingSlash: true,
};

module.exports = nextConfig;
