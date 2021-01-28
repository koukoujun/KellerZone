<template>
  <div class="code">
    <div class="content">
      <img src="@/assets/img/404.png" alt="" />
      <div class="msg">页面走丢了~</div>
      <el-button type="primary" plain @click="back">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "err404Page",
  data() {
    return {
      msg: "start",
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
  },
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
