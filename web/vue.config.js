module.exports = {
  baseUrl: '',

  pwa: {
    themeColor: '#4F2E7C',
  },

  chainWebpack: config => {
    config.externals({
      AFRAME: 'AFRAME',
    })
  },
}
