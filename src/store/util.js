export default {
  install(Vue,options){
    Vue.prototype.$util = {
      method1(val) {
        console.log('测试util-1函数')
      },
      method2(val) {
        console.log('测试util-2函数')
      }
    }
  }
}
