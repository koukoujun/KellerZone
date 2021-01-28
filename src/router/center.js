export default [
  //个人中心
  {
    path: "/center",
    name: "Center",
    meta: { title: "个人中心", keepAlive: false, auth: true },
    component: () => import("@/views/Center/view/Main.vue")
  },
  //编辑资料
  {
    path: "/center/edit",
    name: "CenterEdit",
    meta: { title: "个人资料", keepAlive: false, auth: true },
    component: () => import("@/views/Center/view/Edit.vue")
  }
]