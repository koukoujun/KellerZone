<template>
  <div class="jobspace-science">
    <!-- left controller -->
    <div class="tab-left-controller" >
      <div class="box" >
        <div v-for="(item,index) in labelList" :key="index" @mouseover="Controller('show_content',item.id,index)" >{{item.title}}</div>
      </div>
    </div>
    <!-- show-content -->
    <div class="show-content" >  
      <Show-screen :content_show="showContent" ref='mychild' ></Show-screen> 
    </div>
  </div>
</template>

<script lang="ts">
const show_screen = ()=> import('../components/screen.vue') 
export default{
    components:{
     "Show-screen":show_screen
    },
    name:'JobSpaceScience',
    data(){
        return{
            msg:'代码世界',
            labelList:[],
            showContent:{content_c:'',content_e:''}
        }
    },
    methods:{
      //get init page data
      getData () {
        const params = {}
        this.$Request.requestPost(params,this.$api.apiJobSpace.science).then((res) => {
          console.log(res.data)
          this.labelList = res.data
        }).catch((err) => {
          console.log(err)
        })
      },
      //controller
      Controller(name,id,index){
        switch(name){
          case 'show_content':
            this.showContent.content_c = this.labelList[index].content_c
            this.showContent.content_e = this.labelList[index].content_e
            this.$refs.mychild.Controller('content_show')
          break;
          default:
          break;
        }
      }
    },
    mounted(){
      this.$store.commit('tabClickIndexChange',0)
      this.getData()
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style','background-color:rgba(51,51,51,1);')
    }
}
</script>

<style scoped lang="less">
// 自定义颜色
@color-bg:#333333;
@color-content:rgba(73, 142, 199, 0.6);
@color-text:rgba(73, 142, 199, 1);
@color-border:rgba(73, 142, 199, 0.2);
//隐藏侧边滚动条
::-webkit-scrollbar {
     width: 0 !important;
   }
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
.codeWorld{
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
}
.tab-left-controller{
  position: fixed;
  z-index: 1000;
  top: 0;
  left:0;
  width:10vw;
  height:100%;
  .box{
    width:5vw;
    height:100%;
    padding:10px;
    font-size:14px;
    border-right: 2px solid @color-content;
    display: flex;
    flex-direction: column;
    animation: 200ms;
    -webkit-animation: breath_controller 2000ms;
    animation-iteration-count:infinite;
    -webkit-animation-iteration-count:infinite; /*Safari and Chrome*/
    animation-direction:alternate;
    -webkit-animation-direction:alternate; /* Safari 和 Chrome */
    @keyframes breath_controller {
      form{box-shadow: 0 0 10px 3px @color-content;}
      to{box-shadow: 0 0 20px 6px @color-content;}
    }
    div{
      width:100%;
      height: 6vh;
      border-bottom: 1px solid @color-border;
      color: @color-text;
      display: flex;
      justify-content: center;
      align-items: center;
      text-shadow: 0 0 8px @color-content,-0 -0 8px @color-content;
    }
    div:hover{
      background-image: linear-gradient(to left,rgba(0, 0, 0, 0),@color-border);
    }
  }
}
.show-content{
  width:94vw;
  margin-left:6vw;
}
</style>
