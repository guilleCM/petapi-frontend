const nextTranslate = require('next-translate')

module.exports = {
  ...nextTranslate({}),
  async rewrites() {
    return [
      {
        source: '/(dogs|honden|gossos)',
        destination: '/perros',
      },
    ]
  },
}
