
module.exports = {
    publicPath: '/kellerzone/', // 这样表示相对路径， 可以部署在任意路径下，如果为 / 则只能在nginx的html的根路径下面，如果指定为/app/ ，则可以部署在/app下面，默认为/
    // 构建输出目录
    outputDir: 'dist', 
    // 静态资源目录 (js, css, img, fonts)
    assetsDir: 'assets', 
    //关闭eslint校验
    lintOnSave: false,
    //关闭生成map文件
    productionSourceMap:false,
    //指定打包目录
    outputDir:process.env.outputDir,
    
    //webpack配置
    configureWebpack: {
      externals: {
        'AMap': 'AMap' // 高德地图配置
      }
    }
  }