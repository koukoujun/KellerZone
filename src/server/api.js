// api 接口列表
const api = {
  // 用户
  apiUser: {
    list:'user',
    user:'user/user',
    add:'user/add',
    login:'user/login',
    update:'user/update'
  },
  // job space
  apiJobSpace: {
    science:'/jobspace/science',
    schedule_add:'/jobspace/schedule_add',
    schedule_list:'/jobspace/schedule_list',
    schedule_update:'/jobspace/schedule_update',
    schedule_delete:'/jobspace/schedule_delete'
  },
  // community
  apiCommunity:{
    list:'community',
    add:'community/add',
    article_add_praise:'community/article_add_praise',
    article_detail:'community/article_detail',
    article_search:'community/article_search',
    rep_detail:'community/rep_detail',
    rep_add:'community/rep_add',
    rep_add_praise:'community/add_praise'
  },
  // works
  apiWorks:{
    resume:'works/resume',
    resume_add:'/works/resume_add',
    resume_compile:'/works/resume_compile'
  },
  // tools
  tools:{
    option:'tools/option',
    list:'tools',
    add:'tools/add',
    list_social:"/tools/list_social",
    add_social:"/tools/add_social"
  },
  //feedback
  feedback:{
    add:'feedback/add'
  },
  //common
  common:{
    province:'/common/province',
    city:'/common/city',
    area:'/common/area'
  }
}
export default api
