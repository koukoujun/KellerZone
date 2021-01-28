
module.exports = {
    lintOnSave: false,
    configureWebpack: {
      externals: {
        'AMap': 'AMap' // 高德地图配置
      }
    }
  }