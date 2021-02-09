<template>
  <div class="community">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
    ></Tab-navigation>
    <!-- content -->
    <div class="content">
      <div class="content-box" v-for="(itemArr,indexArr) in listData" :key="indexArr" >
        <div class="content-box_row_tab" >
          <div><i class="el-icon-s-unfold"></i> {{itemArr.type}}</div>
          <div>查看更多</div>
        </div>
        <div class="content-box_row_con" >
          <div v-for="(item,index) in itemArr.content" :key="index" >
            <div class="content-box_row_con_card" @click="Controller('link',itemArr.type,item.src)" >、
              <!-- 可预览图片 -->
              <el-image 
                v-if="itemArr.type == '图片'"
                style="width: 100%; height: 100%"
                :src="item.cover_img" 
                :preview-src-list="srcList">
              </el-image>
              <!-- 普通封面 -->
              <img v-if="itemArr.type != '图片'" :src="item.cover_img" alt="">
              <div>{{item.title}}</div>
              <div>{{item.desc}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "community",
  data() {
    return {
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'简历列表',path:'/works/resume'},
        {name:'个人作品',path:'/works/invalid_works'},
      ],
      //参数
      listData:[
        {type:'视频',content:[
          {cover_img:require('@/assets/img/default_img.jpg') ,title:'视频1',desc:'视频1详情',src:'http://www.kaiyi.xyz/001/test/test.mp4'},
          {cover_img:require('@/assets/img/default_img.jpg'),title:'视频2',desc:'视频2详情',src:'http://www.kaiyi.xyz/001/test/test.mp4'}
        ]},
        {type:'音频',content:[
          {cover_img:require('@/assets/img/default_img.jpg'),title:'音频1',desc:'音频1详情',src:'http://www.kaiyi.xyz/001/test/test.mp3'},
          {cover_img:require('@/assets/img/default_img.jpg'),title:'音频2',desc:'音频2详情',src:'http://www.kaiyi.xyz/001/test/test.mp3'}
        ]},
        {type:'文章',content:[
          {cover_img:require('@/assets/img/default_img.jpg'),title:'文章1',desc:'文章1详情',src:'http://www.kaiyi.xyz/001/test/test.txt'},
          {cover_img:require('@/assets/img/default_img.jpg'),title:'文章2',desc:'文章2详情',src:'http://www.kaiyi.xyz/001/test/test.txt'}
        ]},
        {type:'图片',content:[
          {cover_img:require('@/assets/img/default_img.jpg'),title:'图片1',content:'图片1详情'},
          {cover_img:require('@/assets/img/default_img.jpg'),title:'图片2',content:'图片2详情'}
        ]},
        {type:'程序',content:[
          {cover_img:require('@/assets/img/default_img.jpg'),title:'程序1',desc:'程序1详情',src:'http://www.kaiyi.xyz/001/small_project/eatSnake/start.html'},
          {cover_img:require('@/assets/img/default_img.jpg'),title:'程序2',desc:'程序2详情',src:'http://www.kaiyi.xyz/001/small_project/eatSnake/start.html'}
        ]},
      ],
      //图片预览列表
      srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
    };
  },
  methods: {
    // get init data
    getData() {
      const params = {
        id:this.currentId
      };
      this.$Request
        .requestPost(params, this.$api.apiWorks.resume)
        .then((res) => {
          //预览图片导入
          let arrData = this. listData
          arrData.map((itemArr)=>{
            if(itemArr.type == '图片'){
              itemArr.content.map((item)=>{
                this.srcList.push(item.cover_img)
              })
            }
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // controller
    Controller(name,param1,param2) {
      switch (name) {
        case "link":
          if(param1 == '视频'){
            this.$router.push({path:'/common/videoplayer',query:{src:encodeURI(param2)}})
          }else if(param1 == '程序'){
            window.open(param2)
          }else if(param1 == '文章'){
            this.$message.warning('阅读器功能开发中~')
            //this.$router.push({path:'/common/txtplayer',query:{src:encodeURI(param2)}})
          }else if(param1 == '音频'){
            this.$router.push({path:'/common/soundplayer',query:{src:encodeURI(param2)}})
          }
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
  created() {
    this.getData();
  }
};
</script>
<style scoped lang="less">
//自定义变量
//content
.content {
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin-left: 15vw;
  background-color: white;
  padding:20px 40px;
  .content-box{
    display: flex;
    flex-direction: column;
    .content-box_row_tab{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      font-size: 20px;
      background-color: #ecf5ff;
      padding: 10px;
      color: #666666;
    }
    .content-box_row_con{
      padding:20px 0 80px 0 ;
      display: flex;
      flex-direction: row;
      .content-box_row_con_card{
        margin-right: 40px;
        width: 150px;
        height: 200px;
        text-align: left;
        font-size: 16px;
        color: #999999;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

</style>
