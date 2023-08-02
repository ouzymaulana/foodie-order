/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        // protocol: "http://localhost:5000/images/",
      },
    ],
  },

  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.(woff|woff2|eot|ttf|otf)$/,
  //     use: {
  //       loader: "file-loader",
  //       options: {
  //         name: "[name].[ext]",
  //         outputPath: "static/fonts/",
  //         publicPath: "/_next/static/fonts/",
  //       },
  //     },
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
