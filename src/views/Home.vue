<template>
  <div class="Home">
    <div class="main-show">
    <!-- head -->
    <div class="head" >
       <div class="inner" >
         <div >首页</div>
         <div class="tab-title"  @click="Controller('jobspace')">职业空间</div>
         <div class="tab-title" @click="Controller('works')">自我展示</div>
         <div class="tab-title" @click="Controller('literature')">娱乐天地</div>
         <div class="tab-title" @click="Controller('community')">交流社区</div>
         <div class="tab-title" @click="Controller('tools')">工具之家</div>
         <div class="tab-title" @click="Controller('feedback')">反馈留言</div>
       </div>
    </div>
    <!-- body -->
    <div class="body" >
       <img src="../assets/img/main/banner.png" style="width:100%;height:100%" > 
    </div>
    <!-- content-one -->
    <div class="content-one" >
       <div class="row-one" >
        <div class="list-one" >
          <div>コードの</div>
          <div>代码の世界</div>
        </div>
        <div class="list-two" >
          <div class="inner-one" >
            <div v-for="(item,index) in listDataOne" :key="index" @click="jumpLink(item.type,item.link)" >{{item.name}}</div>
          </div>
          <div class="inner-two" >
           <span v-for="(item,index) in listDataTwo" :key="index" @click="jumpLink(item.type,item.link)">&lt;&nbsp;{{item.name}}</span>
          </div>
        </div>
        <div class="list-three" >
          <div><input type="text" maxlength="12" v-model="searchValue" ></div>
          <div><img src="../assets/img/main/search.png" @click="Controller('search')" ></div>
        </div>
       </div>
    </div>
    <!-- content-two-图片切换展示 -->
    <div class="content-two" >
      <div class="list-beside" @click="jumpLink(bannerData[0].type,bannerData[0].link)" >
        <div class="row-one" >
          <p>|</p>
          <p>{{bannerData[0].name}}</p>
        </div>
        <div class="row-two" >
          <img src="../assets/img/main/icon_02.png">
        </div>
      </div>
      <div class="list-center" >
        <el-carousel  trigger="click" height="320px" class="list-center-box"  >
          <el-carousel-item v-for="(item,index) in bannerDataScroll" :key="index">
            <img :src="item.img" style="width:100%;height:100%" @click="jumpLink('third',item.link)" >
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="list-beside" @click="jumpLink(bannerData[1].type,bannerData[1].link)" >
        <div class="row-one" >
          <p>|</p>
          <p>{{bannerData[1].name}}</p>
        </div>
        <div class="row-two" >
          <img src="../assets/img/main/icon_02.png">
        </div>
      </div>
    </div>
    <!-- content-three -->
    <div class="content-three" >
      <div class="list-one" >
          <div>これは人気のある書籍である</div>
          <div>热门の书籍</div>
      </div>
      <div class="list-two" >
        <div v-for="(item,index) in hotBookData" :key="index" >
          <img :src="item.img" @click="jumpLink(item.type,item.link)">
        </div>
      </div>
    </div>
    <!-- content-four -->
    <div class="content-four" >
      <div class="show_code" >
        <div class="left" >
          <div>关注官方QQ</div>
          <div>扫描二维码</div>
          <div>官方QQ</div>
        </div>
        <div class="right" >
          <img src="../assets/img/main/code_qq.png" >
        </div>
      </div>
      <div class="show_code">
        <div class="left" >
          <div>关注官方QQ</div>
          <div>扫描二维码</div>
          <div>官方QQ</div>
        </div>
        <div class="right" >
          <img src="../assets/img/main/code_qq.png">
        </div>        
      </div>
      <div class="show_center"></div>
      <div class="show_code">
        <div class="left" >
          <div>关注官方QQ</div>
          <div>扫描二维码</div>
          <div>官方QQ</div>
        </div>
        <div class="right" >
          <img src="../assets/img/main/code_qq.png">
        </div>
      </div>
      <div class="show_code">
        <div class="left" >
          <div>关注官方QQ</div>
          <div>扫描二维码</div>
          <div>官方QQ</div>
        </div>
        <div class="right" >
          <img src="../assets/img/main/code_qq.png">
        </div>
      </div>
    </div>
    <!-- foot -->
    <div class="foot" >
       <img src="../assets/img/main/bg_bottom.png" > 
    </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Home',
  data () {
    return {
      /* data */
       listDataOne:[
         {name:'HTML',type:'third',link:'https://www.runoob.com/html/html-tutorial.html'},
         {name:'CSS',type:'third',link:'https://www.runoob.com/css/css-tutorial.html'},
         {name:'JAVASCRIPT',type:'third',link:'https://www.runoob.com/js/js-tutorial.html'},
       ],
       listDataTwo:[
         {name:'代码库列表',type:'third',link:'https://www.runoob.com/'},
       ],
       bannerData:[
         {name:'VUE框架',type:'third',link:'https://vuejs.bootcss.com/guide/'},
         {name:'REACT框架',type:'third',link:'https://react.docschina.org/'},
       ],
       hotBookData:[
        {name:'vue',type:'third',img:require('../assets/img/main/show_vue.png'),link:'https://vuejs.bootcss.com/guide/'},
        {name:'react',type:'third',img:require('../assets/img/main/show_react.png'),link:'https://react.docschina.org/'},
        {name:'node',type:'third',img:require('../assets/img/main/show_node.png'),link:'http://nodejs.cn/'},
        {name:'webpack',type:'third',img:require('../assets/img/main/show_webpack.png'),link:'https://www.webpackjs.com/'},
        {name:'egg',type:'third',img:require('../assets/img/main/show_egg.png'),link:'https://eggjs.org/zh-cn/'},
       ],
       bannerDataScroll:[
         {img:'http://p.qpic.cn/qqconadmin/0/dbf223ef0ba448d6b37636cb623dfbdb/0?tp=webp',link:'https://ke.qq.com/course/97965?taid=10935394757607085#paysource=1'},
         {img:'http://p.qpic.cn/qqconadmin/0/e6e8e20f0b184344ad243605cd92517f/0?tp=webp',link:'https://ke.qq.com/course/315238?taid=3549245009612646#paysource=1'},
         {img:'http://p.qpic.cn/qqconadmin/0/df32dd450d684655a91bf5c951ca6eda/0?tp=webp',link:'http://p.qpic.cn/qqconadmin/0/df32dd450d684655a91bf5c951ca6eda/0?tp=webp'},
         {img:'https://p.qpic.cn/qqconadmin/0/cef82de253e341d38fda7b344b58f9bd/0?tp=webp',link:'https://ke.qq.com/course/97604?taid=10602045165894980#paysource=1'},
       ],
       /* param */
       searchValue:'',//搜索内容
    }
  },
  methods: {
    // Controller
    Controller(name,param1){
      switch(name){
        case 'jobspace':
          this.$router.push('/jobspace/schedule')
        break;
        case 'works':
          this.$router.push('/works/resume')
        break;
        case 'literature':
          this.$router.push('/literature')
        break;
        case 'community':
          this.$router.push('/community')
        break;
         case 'tools':
          this.$router.push('/tools')
        break;       
        case 'feedback':
          this.$router.push('/feedback')
        break;
        case 'search': 
          window.open('https://www.baidu.com/s?wd='+this.searchValue)
        break;
        default:
        break;
      }
    },
    //jumpLink
    jumpLink(type,link){
      if(type == 'third'){
        window.open(link)
      }else{
        this.router.push({path:link})
      }
    }
  },
  mounted () {
    this.$store.commit('tabClickIndexChange',0)
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style','background-color:rgba(255,255,255,1)')
  }
}
</script>
<style lang="less" scoped>
  // 自定义颜色
  @color_lucencry: rgba(194,160,96,0.6);
  @color_full: rgba(194,160,96,1);
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .main-show{
    animation: 2000ms;
    -webkit-animation: main-show 2000ms;
    @keyframes main-show {
      from{ opacity:0.1; }
      to{ opacity: 1; }
    }
  }
  .head{
    width: 100%;
    height: 80px;
    position: fixed;
    z-index:1000;
    top: 0;
    left: 0;
    background-image:url('../assets/img/main/tab_bg.jpg');
    box-shadow: 0 4px 20px 4px  rgba(73, 142, 199, 0.6);
    .inner{
      width:70%;
      height:100%;
      justify-content: space-around;
      align-items: center;
      margin-left:15%;
      .flex-row();
      div{
        width:11.6%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size:18px;
      }
      div:first-child{
        background-image: url('../assets/img/main/icon_01.png') ;
        background-repeat: no-repeat; /*不平埔*/
        background-position:50% 50% ; /*居中*/
        background-size:100% 100%; /*背景图片大小*/
        position: relative;
        display: block;
        width: 118px;
        height: 80px;
        line-height: 100px;
        font-size: 18px;
        color: #000000;
        text-align: center;
        padding-bottom:20px;
        -webkit-transition: all .3s ease;
        -moz-transition: all .3s ease;
        -ms-transition: all .3s ease;
        transition: all .3s ease;
      }
      .tab-title{
        cursor: pointer;
      }
    }
  }
  .body{
    margin-top:80px;
  }
  // 内容一区
  .content-one{
    width: 70%;
    margin-left:15%;
    margin-top:20px;
    .row-one{
      .flex-row();
      // content内容行1
      .list-one{
        .flex-row();
        padding-right:80px;
        div:nth-child(1){
          width:12px;
          font-size:24px;
          padding-right:20px;
          word-wrap: break-word;
          text-align: center;
          color:rgba(0, 0, 0, 0.6)
        };
        div:nth-child(2){
          width:24px;
          font-size:24px;
        }
      }
      .list-two{
         display: flex;
         flex-direction: column;
        .inner-one{
          width:450px;
          height:60px;
          .flex-row();
          align-items: center;
          justify-content: center;
          border:2px solid @color_lucencry ;
          padding:4px;
          div{
            width:33%;
            height:100%;
            margin: 4px;
            .flex-row();
            align-items: center;
            justify-content: center;
            font-size:20px;
          };
          div:hover{
            background-color: @color_lucencry;
            color:#ffffff;
          }
        }
        .inner-two{
          width:450px;
          height:60px;
          color: @color_lucencry;
          font-size:22px;
          text-align: left;
          margin-top:20px;
        }
      }
      .list-three{
        width:300px;
        margin-left:42%;
        margin-top:30px;
        .flex-row();
        input{
          border: none;
          border-bottom: 1px solid @color_lucencry;
          outline-style: none;
          height:24px;
          font-size:20px;
          color:@color_lucencry;
        }
        img{
          width:24px;height:24px;margin-left:5px;
        }
      }
    }
  }
  // 内容二区 - 图片切换
  .content-two{
    .flex-row();
    align-items: center;
    justify-content: space-around;
    width: 70%;
    margin-left:15%;
    margin-top:40px;
    .list-beside{
      width:10%;
      height:450px;
      border:2px solid @color_lucencry;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .row-one{
        padding-top:40px;
        font-size:22px;
        width:20%;
        word-wrap: break-word;
        text-align: center;
        height:360px;
        margin-left:40%;
        color: @color_lucencry;
      }
      img{
        width:100%;height:90px;
      }
    }
    .list-beside:hover{
      border:2px solid @color_full;
      .row-one{color: @color_full}     
    }
    .list-center{
      width:100%;
      height:450px;
      display: flex;
      align-items: center;
      justify-content: center;
      .list-center-box{
        width:90%;
      }
    }
  }
  //内容三区
  .content-three{
    .flex-row();
    justify-content:space-between;
    width: 70%;
    margin-left:15%;
    margin-top:100px;
    .list-one{
      .flex-row();
      padding-right:80px;
      div:nth-child(1){
        width:12px;
        font-size:24px;
        padding-right:20px;
        word-wrap: break-word;
        text-align: left;
        color:rgba(0, 0, 0, 0.6)
      };
      div:nth-child(2){
        width:24px;
        font-size:24px;
      }
    }
    .list-two{
      width:85%;
      height:600px;
      .flex-row();
      justify-content: space-around;
      align-items: flex-end;
      background-image: url('../assets/img/main/icon_05.jpg');
      background-size:100% auto;
      background-repeat:no-repeat;
      background-position-y:50%;
      padding:0 20px;
      div{
        width: 18%;
        height:550px;
        transition:height,500ms;
        -webkit-transition:height,500ms; /* Safari */
        img{
          width:100%;
          height:auto;
        }
      }
      div:hover{
        height:550px;
        margin-bottom:50px;
      }
    }
  }
  //内容四区
  .content-four{
    justify-content:space-around;
    width: 70%;
    margin-left:15%;
    margin-top:150px;
    background-color: rgba(204, 204, 204, 0.2);
    .flex-row();
    .show_code{
      width: 240px;
      height:200px;
      border:3px solid rgba(204, 204, 204, 1);
      margin:20px;
      .flex-row();
      .left{
        width:50%;
        padding-left:20px;
        .flex-row();
        div{
          width:20px;
          font-size:20px;
          padding: 10px 5px;
          word-break: break-all;
          color:rgba(0, 0, 0, 0.6);
        }
        div:nth-child(3){
          font-size:24px;
          color:rgba(0, 0, 0, 0.8);
        }
      }
      .right{
        width:50%;
        img{
          position: absolute;
          width:7vw;
          margin-top:-50px;
          margin-left:-1.5vw;
        }
      }
    };
    .show_center{
      border: 1px solid #ff3300;
      width:120px;
      height:auto;
      margin-left:50px;
      background-image: url('../assets/img/main/icon_04.png');
      background-size: 100% 100%;
    }
  }
  //foot
  .foot{
    margin-top:100px;
    img{
      width:100%;height:100%;
    }
  }
  //code-protect-screen
  .code-screen{
    .code-number{
      position:fixed;z-index:1000;top:0;left:0
    }
    .code-password{
      position:fixed;z-index:1100;top:50%;left:45%;
      input{
        width:10vw;
        color: green;
        border:2px solid green;
        background-color: #000000;
        outline-style: none;
      }
      input:-webkit-autofill {
          transition: background-color 5000s ease-in-out 0s;
      }
      div{
        font-size:20px;
        color: red;
        margin-top:5px;
        animation: 500ms;
        -webkit-animation:error 500ms;
        @keyframes error {
          from{opacity: 0.1;}
          to{opacity: 1;}
        }
        span{
          text-shadow: 0 0 8px rgba(255, 0, 0, 0.6),-0 -0 8px rgba(255, 0, 0, 0.6);
        }
      }
    }
  }
  //走马灯
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
