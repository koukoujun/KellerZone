import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from './main.js'
import JobSpace from './jobspace.js'
import Community from './community.js'
import FeedBack from './feedback.js'
import Literature from './literature.js'
import Works from './works.js'
import Tools from './tools.js'
import Common from './common.js'
import Center from './center.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode : 'history',
  base : process.env.BASE_URL,
  routes:[
    ...Common,
    ...Main,
    ...JobSpace,
    ...Community,
    ...FeedBack,
    ...Literature,
    ...Works,
    ...Tools,
    ...Center
  ]
})

// 处理vue-router.esm.js?8c4f:2089 Uncaught (in promise) 的发生
const originalPush:any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location:any) {
 return originalPush.call(this, location).catch((err:any) => err)
}

export default router
