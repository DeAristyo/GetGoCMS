const withImages = require('next-images');

module.exports = {
  reactStrictMode: true,
  withImages: withImages(),
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};
