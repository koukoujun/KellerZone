export default [
  //职业科普
  {
    path: "/jobspace/science",
    name: "JobSpaceScience",
    meta: { title: "职业科普", keepAlive: false, auth: true },
    component: () => import("@/views/JobSpace/view/Science.vue")
  },
  //待办管理
  {
    path: "/jobspace/schedule",
    name: "JobSpaceSchedule",
    meta: { title: "事项管理", keepAlive: false, auth: true },
    component: () => import("@/views/JobSpace/view/Schedule.vue")
  }
]