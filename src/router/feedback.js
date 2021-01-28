export default [
  //反馈
  {
    path: "/feedback",
    name: "Feedback",
    meta: { title: "反馈", keepAlive: false, auth: false },
    component: () => import("@/views/FeedBack/view/Main.vue")
  }
]