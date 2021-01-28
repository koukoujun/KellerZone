<template>
  <div class="txt-player">
    <div class="content" >
      <h1>阅读</h1>
      <iframe class="filename" :src="src" width='100%' height='600' frameborder='1' ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
export default{
    name:'txtPlayers',
    data(){
        return{
          src:''
        }
    },
    created() {
      this.src = decodeURI(this.$route.query.src) 
    }
}
</script>

<style scoped lang="less">
.video-player{
 width: 100vw;
 height: 100vh;
 overflow: hidden;
 display: flex;
 align-items: center;
 justify-content: center;
 background: #cccccc;
}
.content{
  width:80vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
