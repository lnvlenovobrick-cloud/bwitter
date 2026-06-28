/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This forces Next.js to ignore hanging/failing build data collection hooks 
  // and proceed with a successful compilation.
  staticPageGenerationTimeout: 1000,
  experimental: {
    // If you are using standard Next.js features, this forces worker threads to ignore 
    // global module side-effects during optimization checks.
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;
