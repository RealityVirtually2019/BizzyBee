module.exports = {
  baseUrl: '',

  pwa: {
    themeColor: '#000000',
  },

  chainWebpack: config => {
    config.externals({
      TweenMax: 'TweenMax',
      AFRAME: 'AFRAME',
      Bounce: 'Bounce',
    })
  },
}
