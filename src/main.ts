import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'lib-flexible'

//elementui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)

// axios
import Request from './server/http'
import api from './server/api'
Vue.prototype.$Request = Request
Vue.prototype.$api = api

//util 全局组件
import utils from './store/util'
Vue.use(utils)

//导出页面为pdf
import htmlToPdf from '@/views/Works/components/htmlToPdf.js'
Vue.use(htmlToPdf)

//引入vue播放器
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)


//路由钩子
router.beforeEach((to, from, next) => {
  // 切换路由页面返回顶部
  window.scrollTo(0,0);
  // 对组件进行动态缓存
  if (to.meta.keepAlive === true) {
    store.commit("iskeepAlive", to.name);
    next();
  } else if (from.meta.keepAlive === true && to.meta.clearAlive == true) {
    store.commit("noKeepAlive", from.name);
    next();
  }

  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  /* 匹配路由权限 */
  const userInfo = sessionStorage.getItem("token") || null; //获取登录信息
  if (!userInfo && to.meta.auth) {
    next("/login");
  } else {
    next();
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
