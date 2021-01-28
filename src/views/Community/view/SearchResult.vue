<template>
  <div class="community">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
    ></Tab-navigation>
    <!-- content -->
    <div class="content" >
      <div class="container">
        <div class="inner-label" >
          <div>全部</div>
          <div>1月内</div>
          <div>1周内</div>
          <div>1天内</div>
        </div>
        <!-- main -->
        <div class="main" v-for="(item,index) in dataList" :key="index" >
          <div class="con-left">
            <div class="con-left-head" >小胖子<span>&bull;</span>7小时前<span>&bull;</span>{{item.type}}</div>
            <div class="con-left-body" @click="Controller('detail',item.id)" >{{item.title}}</div>
            <div class="con-left-foot" >
              <div class="con-things" >
                <div class="con-prase" ><i class="el-icon-thumb" @click="addPraise(item.id)"></i><span>{{item.praise_count}}</span></div>
                <div class="con-response" @click="Controller('detail',item.id)" ><i class="el-icon-chat-square"></i><span>{{item.response_count}}</span></div>
                <div class="con-share" ><i class="el-icon-more"></i></div>
              </div>
            </div>
          </div>
          <div class="con-right" >
            <img src="@/assets/img/head.jpg">
          </div>
        </div>
      </div>
      <div class="label" ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Alert } from 'element-ui'
const Navigation = () => import("@/components/tab/navigation.vue");
export default{
    components:{
      'Tab-navigation':Navigation
    },
    name:'community',
    data(){
        return{
          /* 导航配置 */
          //导航列表
          tabMsgList:[
            {name:'热点',path:'/community'}
          ],
          //按钮列表
          tabBtnList:[
            {name:'写文章',type:'link',func:'',path:'/community/compile'},
          ],
          /* 参数 */
          dataList:[]
        }
    },
    methods:{
      // get init data
      getData(){
        this.dataList = this.$store.state.communitySearchData
      },
      //文章评论点赞
      addPraise(id){
        const params = {
          id:id
        }
        this.$Request.requestPost(params,this.$api.apiCommunity.article_add_praise).then((res) => {
          console.log(res)
          this.getData()
        }).catch((err) => {
          console.log(err)
        })
      },
      // controller
      Controller(name,id,index){
       switch(name){
         case 'detail':
           this.$router.push('/community/detail?id='+id)
         break;
         default:
         break;
       }
      }
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style','background-color:rgba(204,204,204,0.2)')
    },
    created(){
      this.getData()
    }
}
</script>

<style scoped lang="less">
@color-border:rgba(204,204,204,0.6);
@color-bg:#ffffff;
@color-text-black:#333333;
@color-text-gray:#cccccc;
@color-text-blue:#409eff;
.el-icon-thumb:hover{
color:@color-text-blue;
}
// content
.content{
    width:70%;
    height:auto;
    margin-left:15%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top:140px;
    .container{
      width:75%;
      min-height:100vh;
      margin-right:40px;
      background-color: @color-bg;
      border-radius:4px;
      // 标签页
      .inner-label{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        border-bottom: 1px solid @color-border;
        width:100%;
        height:70px;
        font-size:20px;
        color: @color-text-black;
        div{
          padding:0px 20px;
          border-left:1px solid @color-border;
        }
        div:first-child{
          border: none;
        }
      }
      // 主内容
      .main{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom:1px solid @color-border;
        // left
        .con-left{
          width:70%;
          height:100%;
          display: flex;
          flex-direction: column;
          padding:20px;
          .con-left-head{
            text-align: left;
            color: @color-text-gray;
            font-size:18px;
            span{
              padding:0 5px;
            }
          }
          .con-left-body{
            text-align: left;
            color: @color-text-black;
            font-size:26px;
            font-weight:bold;
            padding-top:5px;
            padding-bottom: 8px;
          }
          .con-left-foot{
            text-align: left;
            color: @color-text-gray;
            font-size:22px;
            .con-things{
              border: 1px solid @color-border;
              width:180px;
              height:35px;
              border-radius:4px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-around;
              font-size: 20px;
              .con-prase{
                width:35%;
                border-right: 1px solid @color-border;
                text-align: center;
                span{
                  padding-left:5px;
                  font-size: 18px;
                }
              }
              .con-response{
                width:35%;
                border-right: 1px solid @color-border;
                text-align: center;
                span{
                  padding-left:5px;
                  font-size: 18px;
                }
              }
              .con-share{
                width:30%;
                text-align: center;
              }
            }
          }
        }
        // right
        .con-right{
          width:30%;
          height:100%;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width:100px;
            height: auto;
          }
        }
      }
    }
    .label{
      width:25%;
      height:60vh;
      background-color: @color-bg;
    }
}

</style>
