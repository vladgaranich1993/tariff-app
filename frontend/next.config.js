/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', destination: 'http://localhost:4000/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
       },
    ];
  },
};
