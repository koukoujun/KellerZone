<template>
  <div class="community-detail">
    <!-- head -->
    <Tab-navigation></Tab-navigation>
    <!-- content -->
    <div class="content">
      <div class="container">
        <!-- container-head -->
        <div class="container-head">
           <div class="col-left" >
              <img :src="formData.avatar_url">
           </div>
           <div class="col-center" >
             <div class="row-name" >{{formData.user_name}}</div>
             <div class="row-msg" ><i class="el-icon-s-cooperation" ></i><span class="kl-inner-padl5" >{{formData.position}}|{{formData.company}}</span></div>
             <div class="row-msg" ><i class="el-icon-s-order"></i><span class="kl-inner-padl5" >{{formData.introduce}}</span></div>
           </div>
           <div class="col-right" >
             <div class="col-right-share" >
               <img src="@/assets/img/icon/weibo.png" alt="">
               <img src="@/assets/img/icon/liulanqi.png" alt="">
               <img src="@/assets/img/icon/github.png" alt="">
             </div>
             <div>
               <el-button type="primary" plain @click="controller('edit')" >编辑资料</el-button>
             </div>
           </div>
        </div>
      </div>
      <!-- container-right -->
      <div class="label"></div>
    </div>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation
  },
  name: "Center",
  data() {
    return {
      formData:{}
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
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //controller
    controller(name, index, fid) {
      switch (name) {
        case "add_rep":
          this.clickIndex = index;
          this.clickIndexOne = null;
          this.fid = fid
          break;
        case "add_rep_one":
          this.clickIndexOne = index;
          this.clickIndex = null;
          this.fid = fid
          break;
        case 'edit':
          this.$router.push({path:'/center/edit'}) 
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
    console.log(this.$route.query.id);
    this.getData()
  },
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
    height: 22vh;
    margin-right: 40px;
    background-color: @color-bg;
    border-radius: 4px;
    display: flex;
    align-items: center;
    // head
    .container-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 90%;
      padding: 2% 5%;
      height: 130px;
      .col-left{
        flex-basis: 20%;
        text-align: left;
        img{
          width: 130px;
          border-radius: 100px;
        }
      }
      .col-center{
        flex-basis: 60%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .row-name{
          font-size: 30px;
          font-weight: bolder;
        }
        .row-msg{
          font-size: 18px;
          margin-top: 8px;
        }
      }
      .col-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 85%;
        .col-right-share{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          img{
            width: 25px;
          }
        }
      }
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
