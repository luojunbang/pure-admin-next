const nextConfig = {
  // output: 'export',
  reactStrictMode: false,
}

/** @type {import('next').NextConfig} */
module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.module.rules.push({
      test: /.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
