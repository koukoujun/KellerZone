<template>
  <div id="app">
    <transition :name="transitionName" >
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
      return {
          transitionName:'slide-base'
      }
  },
  methods: {
    //App.vue
    isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
  mounted() {
    if (this.isMobile()) {
      this.$router.replace({path:'/error',query:{status:'mobile'}});
    }
  }
}
</script>

<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  font-size: 20px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  padding: 0;
  margin: 0;
}
#nav {
  padding:0;
}
/* ui beautify */
/deep/ :focus {
  outline: 0;
}
/deep/ el-drawer{
  border: 1px solid red !important;
}
el-drawer:focus {
  outline: none !important;
  outline-style: none !important; 
  border: none !important;
}
el-drawer__open{
  outline: none !important;
  outline-style: none !important; 
  border: none !important;
}
el-drawer__open .el-drawer.rtl:focus{
  outline: none !important;
  outline-style: none !important; 
  border: none !important;
}
el-drawer rtl{
  border: 1px solid red !important;
}
</style>
