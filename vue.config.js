

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10240 }))
  },
  pwa: {
    themeColor: '#17a2b8',
    msTileColor: '#000000',
    iconPaths: {
      favicon32: 'icon.png'
    }
  }
}