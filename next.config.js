const withImages = require('next-images')
const withPWA = require('next-pwa')

const nextConfig = {
  // target: 'serverless',
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  // experimental: {
  //  outputStandalone: true,
  // },
  webpack: (config, { webpack, buildId, isServer }) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx', // Or 'ts' if you don't need tsx
        target: 'es2015'
      }
    }),
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CONFIG_BUILD_ID': JSON.stringify(buildId)
      })
    );

    return config
  }
}

module.exports = withImages(nextConfig)
