export default [
  //主页
  {
    path: "/",
    name: "Home",
    meta: { title: "主页", keepAlive: false, auth: false },
    component: () => import("@/views/Home.vue")
  },
  //登录&&注册
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录", keepAlive: false, auth: false },
    component: () => import("@/views/User/login.vue")
  }
]