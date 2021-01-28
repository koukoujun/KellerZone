import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score:0,
    //导航高亮
    tabClickIndex:0,
    //社区
    communityResponseValue:'',//社区评论区点击索引输入值
    communitySearchData:[]//社区文章搜索结果
  },
  mutations: {
    scoreAdd(state){
		  state.score++
    },
    //社区
    communityResponseValueGet(state,value){
      state.communityResponseValue = value
      console.log(state,value)
    },
    communitySearchDataGet(state,value){
      state.communitySearchData = value
      console.log(state,value)
    },
    //导航高亮改变
    tabClickIndexChange(state,value){
      state.tabClickIndex = value
    }
  },
  actions: {
    increAdd(context) {
        context.commit("scoreAdd");
    },
  },
  modules: {
  }
})
