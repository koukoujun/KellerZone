<template>
  <div class="community-navigation">
    <!-- head -->
    <div class="tab-head">
      <div class="container">
        <!-- left label -->
        <div class="label">
          <div>
            <img
              src="@/assets/img/logo.png"
              class="avator"
              @click="Controller('home')"
            />
          </div>
          <div class="tab-title" @click="Controller('home')">首页</div>
          <div class="tab-title" v-for="(item,index) in tabMsgList" :key="index" @click="Controller('tab_link',item.path,index)">
           <span :class="{activeClass : highLightIndex == index}" >{{item.name}}</span>
          </div>
        </div>
        <!-- right model -->
        <div class="model">
          <!-- 搜索 -->
          <div v-if="is_search"  >
            <el-input placeholder="请输入内容" v-model="search_val">
              <i slot="prefix" class="el-input__icon el-icon-search" @click="Controller('tab_search',tabSearch.func)" ></i>
            </el-input>
          </div>
          <!-- 功能 -->
          <!-- 普通按钮 -->
          <div v-if="btnType!='popover'" >
            <div v-for="(item,index) in tabBtnList" :key="index" >
              <el-button type="primary" plain @click="Controller('tab_btn',item.type,item.path,item.func)">{{item.name}}</el-button>
            </div>
          </div>
          <!-- 带弹层的按钮 -->
          <div v-if="btnType=='popover'">
            <div v-for="(item,index) in tabBtnList" :key="index" >
              <el-popover placement="bottom" width="400" height="auto" trigger="click">
                <div class="popver-box">
                  <div class="pover-title-one" >{{popver_title}}</div>
                  <div class="pover-title-two" >分类</div>
                  <div class="pover-option-list">
                    <div v-for="(item,index) in popver_option" :key="index" 
                    class="pover-option-list_item"  
                    :class="{'pover-option-click':index==clickIndex}"
                    @click="Controller('option',item,index)"
                    >{{item}}</div>
                  </div>
                  <div class="pover-option-submit" >
                    <el-button type="primary" plain  @click="Controller('tab_btn',item.type,item.path,item.func)"
                      >确定并发布</el-button
                    >
                  </div>
                </div>
                <el-button
                  slot="reference"
                  type="primary"
                  plain
                  >{{item.name}}</el-button
                >
              </el-popover>
            </div>
          </div>
          <!-- 消息 -->
          <div>
            <el-button
              type="primary"
              icon="el-icon-message-solid"
              circle
            ></el-button>
          </div>
          <!-- 头像 -->
          <div><img :src="formData.avatar_url" :onerror="defaultImg" @click="Controller('center')" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "community-navigation",
  data() {
    return {
      search_val: "",//搜索内容
      is_search:false,//是否展示搜索框
      formData:{
        avatar_url:require('@/assets/img/head.png')
      },//个人信息
      /* 带弹层的按钮 */
      //popver_title:'',
      //popver_option:[],
      clickIndex:7,
      articleType:'阅读',
      defaultImg:require('@/assets/img/head.png'),
      highLightIndex:0,//高亮索引

      //导航列表
      // tabMsgList:[
      //   {name:'简历列表',path:'/works'},
      //   {name:'page2',path:'/works'},
      //   {name:'page3',path:'/works'}
      // ],
      //按钮列表
      // tabBtnList:[
      //   {name:'写文章',type:'link/func',func:'',path:''},
      //   {name:'btn2',type:'link/func',func:'',path:''}
      // ],
      //是否显示搜索
      //tabSearch:{show:true,func:''}
      //btnType:'',//popover
    };
  },
  props:{
   //导航tab
   tabMsgList:Array,
   //按钮列表
   tabBtnList:Array,
   //搜索
   tabSearch:Object,
   //按钮类型
   btnType:String,
   //按钮弹层标题
   popver_title:String,
   //按钮弹层选项
   popver_option:Array
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
    // controller
    Controller(name,param1,param2,param3) {
      switch (name) {
        case "home":
          this.$router.push("/");
          break;
        case "tab_link":
          this.$store.commit('tabClickIndexChange',param2)
          this.highLightIndex = this.$store.state.tabClickIndex
          this.$router.push(param1);
          break;
        case "tab_btn":
          if(param1 == 'link'){
            this.$router.push(param2);
          } else if(param1 == 'func'){
            this.$emit(param3)
          }
          break;
        case "tab_search": 
         this.$emit(param1,this.search_val)
        break;
        case 'center':
         this.$router.push('/center') 
        break; 
        case "option":
          this.articleType = param1
          this.clickIndex = param2
          break;
        default:
        break;
      }
    },
  },
  created(){
   this.highLightIndex = this.$store.state.tabClickIndex
  },
  mounted() {
    this.getData()
    if(this.tabSearch!=undefined){
       this.is_search = this.tabSearch.show
    }
  }
};
</script>

<style scoped lang="less">
@color-border: rgba(204,204,204,0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
// hover
.tab-title{
  color: #333333;
  cursor: pointer;
}
.tab-title:hover{
  color:#409eff;
}
.activeClass{
  color:#409eff;
}
// tab head
.tab-head {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid @color-border;
  background-color: @color-bg;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .container {
    width: 70%;
    height: 100%;
    margin-left: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .label {
      width: 40%;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 24px;
      div {
        padding-left: 40px;
      }
      .avator {
        width: 35px;
        height: 35px;
      }
    }
    .model {
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      font-size: 24px;
      div {
        margin-right: 40px;
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50px;
        }
      }
    }
  }
}
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
</style>
