<template>
  <div class="community">
    <!-- head -->
    <Tab-navigation></Tab-navigation>
    <!-- loading -->
    <div class="loading" v-show="isShow == false">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- content -->
    <iframe
      id="iframe"
      src="http://www.kaiyi.xyz/"
      class="iframe"
      frameborder="0"
      v-show="isShow == true"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { Alert } from "element-ui";
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "community",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    // get init data
    getData() {
      const params = {};
      this.$Request
        .requestPost(params, this.$api.apiCommunity.list)
        .then((res) => {
          console.log(res);
          this.dataList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // controller
    Controller(name, id, index) {
      switch (name) {
        case "detail":
          this.$router.push("/community/detail?id=" + id);
          break;
        default:
          break;
      }
    },
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgba(204,204,204,0.2)");
  },
  mounted() {
    let _this = this;
    const iframe: any = document.querySelector("#iframe");
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function () {
        _this.isShow = true;
        console.log("iframe已加载完毕");
      });
    } else {
      iframe.onload = function () {
        _this.isShow = true;
        console.log("iframe已加载完毕");
      };
    }
  },
};
</script>

<style scoped lang="less">
@color-border:rgba (204,204,204,0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
.iframe {
  width: 100vw;
  height: 100vh;
  margin-top: 100px;
}
.loading {
  width: 150px;
  height: 20px;
  margin: 0 auto;
  margin-top: 50vh;
}
.loading span {
  display: inline-block;
  width: 20px;
  height: 100%;
  margin-right: 10px;
  border-radius: 50%;
  background: #b3d8ff;
  -webkit-animation: load 1.04s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
    -webkit-transform: scale(1.3);
  }
  100% {
    opacity: 0.2;
    -webkit-transform: scale(0.3);
  }
}
.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.52s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.65s;
}
</style>
