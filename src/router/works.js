export default [
  //个人简历
  {
    path: "/works/resume",
    name: "WorksResume",
    meta: { title: "我的世界", keepAlive: false, auth: true },
    component: () => import("@/views/Works/view/Resume.vue")
  },
  //个人简历-写,编辑
  {
    path: "/works/compile",
    name: "WorksCompile",
    meta: { title: "", keepAlive: false, auth: true },
    component: () => import("@/views/Works/view/Compile.vue")
  },
  //个人作品
  {
    path: "/works/invalid_works",
    name: "WorksInvalidWorks",
    meta: { title: "个人作品", keepAlive: false, auth: true },
    component: () => import("@/views/Works/view/InvalidWorks.vue")
  },
]