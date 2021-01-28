<template>
  <div class="community-detail">
    <!-- head -->
    <Tab-navigation></Tab-navigation>
    <!-- content -->
    <div class="content">
      <div class="container">
        <div class="row" style="text-align:left" ><h2>个人资料</h2></div>
        <div class="row" >
          <div class="row-title" >头像</div>
          <div class="row-upload" >
             <el-image
              style="width: 70px; height: 70px;margin-right:20px"
              :src="imageSingle.url"
              fit="fit"></el-image>
             <Upload-file
              uploadType='file' 
              @getChildVal='getChildVal'
             ></Upload-file>
          </div>
        </div>
        <div class="row" >
          <div class="row-title" >用户名</div>
          <div class="row-con" >
            <el-input v-model="formData.user_name" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="row" >
          <div class="row-title" >职位</div>
          <div class="row-con" >
            <el-input v-model="formData.position" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="row" >
          <div class="row-title" >公司</div>
          <div class="row-con" >
            <el-input v-model="formData.company" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="row" >
          <div class="row-title" >个人介绍</div>
          <div class="row-con" >
            <el-input v-model="formData.introduce" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="row-submit" >
          <el-button type="primary" @click="controller('save')">保存</el-button>
        </div>
      </div>
      <!-- container-right -->
      <div class="label"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Compress } from '@/assets/js/upload.js'
const Navigation = () => import("@/components/tab/navigation.vue");
const UploadFile = () => import("@/components/upload/upload.vue")
export default {
  components: {
    "Tab-navigation": Navigation,
    "Upload-file": UploadFile
  },
  name: "CenterEdit",
  data() {
    return {
      imageSingle:{url:'',file:''},
      formData:{
        user_name:'',
        company:'',
        position:'',
        introduce:''
      }
    };
  },
  computed: {
    listenResponseVal() {
      return this.$store.state.communityResponseValue;
    }
  },
  methods: {
    // get init data
    getData() {
      this.$Request
        .requestPost('', this.$api.apiUser.user)
        .then((res) => {
          console.log(res);
          this.formData = res.data.data
          this.imageSingle.url = res.data.data.avatar_url
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // submit data
    submitData() {
      let formData = new FormData();
      formData.append('image', this.imageSingle.file);
      formData.append('formData',JSON.stringify(this.formData));
      this.$Request
        .requestFormData(formData, this.$api.apiUser.update)
        .then((res) => {
          console.log(res)
          this.$router.push({path:'/center'})
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //获取子组件值
    getChildVal(e){
      console.log(e)
      this.imageSingle.url = e.url 
      this.imageSingle.file = e.file
    },
    //controller
    controller(name) {
      switch (name) {
        case "save":
          console.log(this.fileList)
          this.submitData()
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
    this.getData()
  }
};
</script>

<style scoped lang="less">
@color-border: rgba(204, 204, 204, 0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
@color-text-grayer: #999999;
@color-text-blue:#409eff;
.el-icon-thumb:hover{
  color: @color-text-blue ;
}
//common
.kl-inner-padl5{
  padding-left: 5px;
}
// content
.content {
  width: 70%;
  height: auto;
  margin-left: 15%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 140px;
  .container {
    width: 75%;
    height: 60vh;
    margin-right: 40px;
    background-color: @color-bg;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .row{
      width: 80%;
      margin-left: 10%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 15px 0;
    }
    .row-submit{
      width: 80%;
      margin-right: 5%;
      text-align: right;
      padding: 15px 0;
    }
    .row .row-title{
      width: 10%;
      text-align: right;
      margin-right: 10px;
    }
    .row .row-con{
      width: 80%;
    }
    .row .row-upload{
      width: 80%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }
  }
  //right-lable
  .label {
    width: 25%;
    height: 60vh;
    background-color: @color-bg;
  }
}

</style>
