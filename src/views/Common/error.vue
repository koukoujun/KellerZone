<template>
  <div class="code">
    <div class="content">
      <!-- 404 -->
      <div v-if="status == 404" >
        <img src="@/assets/img/404.png" alt="" />
        <div class="msg">页面走丢了~</div>
      </div>
      <!-- 500 -->
      <div v-if="status == 500" >
        <img src="@/assets/img/500.png" alt="" />
        <div class="msg">服务器内部错误~</div>
      </div>
      <!-- 禁止在移动端打开 -->
      <div v-if="status == 'mobile'" >
        <img src="@/assets/img/404.png" alt="" />
        <div class="msg">请在pc端打开~</div>
      </div>
      <el-button v-if="status!='mobile'" type="primary" plain @click="back">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "errorPage",
  data() {
    return {
      status:Number||String,
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
  },
  created(){
    if(this.$route.query.status){
      this.status = this.$route.query.status
    }else{
      this.status = 404
    }
  }
};
</script>

<style scoped lang="less">
.code {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
.code .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 20vw;
  }
  .msg {
    font-size: 20px;
    color: #cccccc;
    margin: 40px 0;
  }
}
</style>
