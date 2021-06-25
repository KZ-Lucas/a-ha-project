module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/categories/1/experts/2',
        permanent: true,
      },
    ]
  },
}