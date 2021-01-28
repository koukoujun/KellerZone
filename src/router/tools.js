export default [
  //职业工具
  {
    path: "/tools",
    name: "Tools",
    meta: { title: "工具", keepAlive: false, auth: true },
    component: () => import("@/views/Tools/view/Main.vue")
  },
  //社会服务
  {
    path: "/tools/social",
    name: "ToolsSocial",
    meta: { title: "工具", keepAlive: false, auth: true },
    component: () => import("@/views/Tools/view/Social.vue")
  }
]