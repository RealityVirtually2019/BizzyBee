module.exports = {
  baseUrl: '',

  pwa: {
    themeColor: '#000000',
  },

  chainWebpack: config => {
    config.externals({
      AFRAME: 'AFRAME',
    })
  },
}
