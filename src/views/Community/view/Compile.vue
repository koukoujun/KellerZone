<template>
  <div class="community-compile">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
     popver_title='发布文章'
     :popver_option='signOption'
     btnType='popover'
     @submitData='submitData'
    ></Tab-navigation>
    <!-- content -->
    <div class="content">
      <p>文章标题</p>
      <el-input v-model="title" placeholder="请输入内容"></el-input>
      <p>文章内容</p>
      <div class="rich-content">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          class="rich-content-inner"
          :options="editorOption"
        ></quill-editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    "Tab-navigation": Navigation,quillEditor
  },
  name: "community-detail",
  data() {
    return {
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'热点',path:'/community'}
      ],
      //按钮列表
      tabBtnList:[
        {name:'发布',type:'func',func:'submitData',path:''}
      ],
      /* 参数 */
      title:'',
      content: null,
      signOption: ["前端", "后端", "Android",'IOS','人工智能','开发工具','代码人生','阅读'],
      editorOption: {
        // action:  '/api/product/richtext_img_upload.do',  // 必填参数 图片上传地址
        // methods: 'post',  // 必填参数 图片上传方式
        // token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
        // name: 'upload_file',  // 必填参数 文件的参数名
        // size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
        // accept: 'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg'//可选可上传的图片格式
      },
    };
  },
  methods: {
    // submit data
    submitData() {
      const params = {
        name: "测试员",
        title: this.title,
        content: this.$refs.myQuillEditor.value,
        type:this.articleType
      };
      this.$Request
        .requestPost(params, this.$api.apiCommunity.add)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "发布成功！",
            center: true,
          });
          setTimeout(() => {
            this.$router.push("/community");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // controller
    Controller(name, id, index) {
      switch (name) {
        case "community":
          this.$router.push("/community");
          break;
        case "home":
          this.$router.push("/");
          break;
        case "option":
          this.articleType = id
          this.clickIndex = index
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
};
</script>

<style scoped lang="less">
@color-border: rgba(204, 204, 204, 0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
// 选项确定
.pover-option-click{
  background-color:rgba(0, 186, 255,0.1);
  border:1px solid #409eff !important;
}
// 发布块样式
.popver-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .pover-title-one{
    color: #999999;
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .pover-title-two{
    font-size: 21px;
    margin-bottom: 10px;
  }
  .pover-option-list{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    flex-wrap: wrap;
    .pover-option-list_item{
      border: 1px solid #cccccc;  
      border-radius: 4px;
      padding: 5px 10px;
      margin: 5px 0;
      margin-right: 10px;
    }
  }
  .pover-option-submit{
    text-align: center;
  }
}
//content
.content {
  width: 70%;
  height: auto;
  margin-left: 15%;
  margin-top: 140px;
  text-align: left;
  p {
    font-weight: bolder;
    font-size: 24px;
  }
  .rich-content {
    background-color: #ffffff;
    height: 60vh;
  }
  .rich-content-inner {
    height: 94%;
  }
}
</style>
