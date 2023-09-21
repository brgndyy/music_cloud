const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: `/_next/static/sounds/`,
          outputPath: `${options.isServer ? "../" : ""}static/sounds/`,
        },
      },
    });

    return config;
  },
};

module.exports = withVanillaExtract(nextConfig);
