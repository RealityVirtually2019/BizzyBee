module.exports = {
  baseUrl: '',

  pwa: {
    themeColor: '#4F2E7C',
  },

  // https://css-tricks.com/how-to-import-a-sass-file-into-every-vue-component-in-an-app/

  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_vars.scss";`,
      },
    },
  },

  chainWebpack: config => {
    config.externals({
      AFRAME: 'AFRAME',
    })
  },
}
