export default [
  //交流社区
  {
    path: "/community",
    name: "Community",
    meta: { title: "交流社区", keepAlive: false, auth: false },
    component: () => import("@/views/Community/view/Main.vue")
  },
  //详情
  {
    path: "/community/detail",
    name: 'CommunityDetail',
    meta: { title: '详情', keepAlive: false, auth: false },
    component: () => import("@/views/Community/view/Detail.vue")
  },
  //编写
  {
    path: "/community/compile",
    name: 'CommunityCompile',
    meta: { title: '编写', keepAlive: false, auth: true },
    component: () => import("@/views/Community/view/Compile.vue")
  },
  //搜索结果页
  {
    path: "/community/search_result",
    name: 'CommunitySearchResult',
    meta: { title: '搜索结果页', keepAlive: false, auth: false },
    component: () => import("@/views/Community/view/SearchResult.vue")
  }
]