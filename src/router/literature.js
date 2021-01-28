export default [
  //文化
  {
    path: "/literature",
    name: "Literature",
    meta: { title: "文化", keepAlive: false, auth: false },
    component: () => import("@/views/Literature/view/Main.vue")
  }
]