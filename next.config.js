const withPlugins = require('next-compose-plugins');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? '/odin/' : '/',
  basePath: isProd ? '/odin' : '',
  webpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    return config;
  },
};

module.exports = withPlugins([], nextConfig);
