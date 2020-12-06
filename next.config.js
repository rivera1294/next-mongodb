const webpack = require('webpack')
const path = require('path')

const fs = require('fs')
const dotenv = require('dotenv')
const isProduction = process.env.NODE_ENV === 'production'
const envFileName = isProduction ? '.env.prod' : '.env.dev'
const env = dotenv.parse(fs.readFileSync(envFileName))

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const nextConfig = {
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  },
  webpack(config) {
    config.resolve.alias['~'] = `${path.resolve(__dirname)}/`
    config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV']))

    return config
  },
  env,
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../analyze/server.html', // Относительно .next/server/
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './analyze/client.html', // Относительно .next/
    },
  },
}

module.exports = withBundleAnalyzer(nextConfig)
