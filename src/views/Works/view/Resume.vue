<template>
  <div class="community">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
    ></Tab-navigation>
    <!-- content -->
    <div class="content" id="pdfDom">
      <div class="page-box-one">
        <!-- 个人信息 -->
        <div class="page-person">
          <!-- head -->
          <div class="page-person_head">
            <img src="@/assets/img/head.jpg" />
            <span class="name">{{ personData.name }}</span>
            <span>{{ personData.sex }}</span>
            <span>职业：{{ personData.job }}</span>
          </div>
          <!-- body -->
          <div class="page-person_body">
            <!-- part-one -->
            <div class="box-row">
              <span class="left">手机</span>
              <span class="right">{{ personData.phone }}</span>
            </div>
            <div class="box-row">
              <span class="left">QQ</span>
              <span class="right">{{ personData.qq }}</span>
            </div>
            <div class="box-row">
              <span class="left">邮箱</span>
              <span class="right">{{ personData.email }}</span>
            </div>
            <div class="box-row">
              <span class="left">微信</span>
              <span class="right">{{ personData.email }}</span>
            </div>
            <!-- part-tow -->
            <div class="titles">
              <span class="iconfont">&#xe62c;</span>职业意向
            </div>
            <div class="box-row">
              <span class="left">职业</span>
              <span class="right">{{ personData.expJob }}</span>
            </div>
            <div class="box-row">
              <span class="left">居住地</span>
              <span class="right">{{ personData.livePlace }}</span>
            </div>
            <div class="box-row">
              <span class="left">收入</span>
              <span class="right">{{ personData.expIncome }}</span>
            </div>
            <!-- part-three -->
            <div class="titles"><span class="iconfont">&#xe639;</span>技能</div>
            <div class="titles-row">
              <span>{{ personData.skill }}</span>
            </div>
            <div class="titles">
              <span class="iconfont">&#xe634;</span>兴趣爱好
            </div>
            <div class="titles-row">
              <span>{{ personData.interest }}</span>
            </div>
          </div>
        </div>
        <!-- 信息详情 -->
        <div class="page-con">
          <!-- myself -->
          <div class="page-con_box">
            <div class="titles">
              <span class="iconfont">&#xe635;</span>自我介绍
            </div>
            <div class="contents-myself">
              {{ personData.myIntroduce }}
            </div>
          </div>
          <!-- 工作经历 -->
          <div class="page-con_box">
            <div class="titles">
              <span class="iconfont">&#xe63b;</span>工作经历
            </div>
            <div class="contents-education">
              <div
                class="row-msg"
                v-for="(item, index) in personData.jobExp"
                :key="'jobExp' + index"
              >
                <div>
                  <span class="name">{{ item.name }}</span>
                  <span class="time">{{ item.start_time }}~{{ item.end_time }}</span>
                </div>
                <div class="desc">
                  {{ item.content }}
                </div>
              </div>
              <dir class="row-img"></dir>
            </div>
          </div>
          <!-- 项目经历 -->
          <div class="page-con_box">
            <div class="titles">
              <span class="iconfont">&#xe63a;</span>项目经历
            </div>
            <div class="contents-experience">
              <div
                v-for="(item, index) in personData.projectExp"
                :key="'projectExp' + index"
              >
                <div>{{ item.name }}</div>
                <div class="time">
                  <div>{{ item.title }}</div>
                  <div>{{ item.startTime }}~{{ item.endTime }}</div>
                </div>
                <div>
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 控制器 -->
    <div class="controller">
      <div>
        <el-button type="success" plain @click="Controller('compile')" >编辑</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="getPdf()">导出PDF</el-button>
      </div>
      <div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="totalPage"
          @current-change="currentPageChange"
        >
        </el-pagination>
      </div>
    </div>
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
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'简历列表',path:'/works/resume'},
        {name:'个人作品',path:'/works/invalid_works'},
      ],
      //按钮列表
      tabBtnList:[
        {name:'写简历',type:'link',func:'',path:'/works/compile?type=add'}
      ],
      //参数
      htmlTitle: "",
      currentPage: 1,
      currentId:0,
      totalPage: 1,
      pageList:[],
      personData: {
        name: "", //姓名
        sex: "", //性别
        job: "", //职业
        phone: "", //手机号码
        qq: "", //qq
        email: "", //email
        wx: "", //微信
        expJob: "", //期望职业
        livePlace: "", //居住地
        expIncome: "", //期望薪资
        //技能
        skill: [{ name: "", step: '' }],
        //兴趣
        interest:"绘画，打球",
        //自我介绍
        myIntroduce:"",
        //工作经历
        jobExp: [
          {
            name: "",
            startTime: "",
            endTime: "",
            content: "",
          }
        ],
        //项目经历
        projectExp: [
          {
            name: "",
            title: "",
            startTime: "",
            endTime: "",
            content: "",
          }
        ],
      },
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
          console.log(res);
          this.totalPage = parseInt(res.data.data.totalPage) * 10;
          this.personData = res.data.data;
          this.htmlTitle = res.data.data.name
          this.pageList = res.data.data.pageList
          if(this.currentId == 0){
            this.currentId = this.pageList[0]
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentPageChange(val){
       console.log(val)
       this.currentPage = val
       console.log(this.currentPage,this.currentPage-1)
       this.currentId = this.pageList[this.currentPage-1]
       this.getData()
    },
    // controller
    Controller(name, id, index) {
      switch (name) {
        case "detail":
          this.$router.push("/community/detail?id=" + id);
          break;
        case 'compile':
          console.log(this.currentId)
          this.$router.push({path:'/works/compile',query:{type:'compile',id:this.currentId}})
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
  },
};
</script>
<style scoped lang="less">
//自定义变量
@color-border:rgba (204,204,204,0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
@color-text-grayer: #666666;
@color-icon: #00ccff;
.xxx {
  border: 1px solid #333333;
}
//图标定义
@font-face {
  font-family: "iconfont";
  src: url("../../../assets/icon/iconfont.eot");
  src: url("../../../assets/icon/iconfont.eot?#iefix")
      format("embedded-opentype"),
    url("../../../assets/icon/iconfont.woff2") format("woff2"),
    url("../../../assets/icon/iconfont.woff") format("woff"),
    url("../../../assets/icon/iconfont.ttf") format("truetype"),
    url("../../../assets/icon/iconfont.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  color: @color-icon;
  font-style: normal;
  padding-right: 5px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
//content
.content {
  width: 100%;
  height: auto;
  margin-top: 140px;
  margin-bottom: 20px;
  font-size: 16px;
}
// 模板样式01
.page-box-one {
  width: 100%;
  height: 100%;
  min-height: 68vh;
  padding-top: 2vh;
  box-shadow: 0 0 16px 4px rgba(204, 204, 204, 0.4);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  color: @color-text-black;
  // 个人信息部分
  .page-person {
    width: 30%;
    height: 100%;
    min-height: 70vh;
    background-color: rgba(204, 204, 204, 0.2);
    color: @color-text-grayer;
    // head
    .page-person_head {
      font-size: 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 90px;
        height: auto;
        padding-top: 25px;
        padding-bottom: 5px;
      }
      .name {
        font-size: 20px;
      }
      span {
        padding: 2px 0;
      }
    }
    //body
    .page-person_body {
      width: 80%;
      margin-left: 10%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: left;
      .titles {
        font-size: 20px;
        padding: 10px;
        color: @color-text-black;
        font-weight: bolder;
        display: flex;
        align-items: center;
      }
      .titles-row {
        padding: 2px 10px;
      }
      .box-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        padding: 5px 10px;
        .left {
          width: 30%;
        }
        .right {
          width: 70%;
        }
      }
    }
  }
  // 详情部分
  .page-con {
    width: 70%;
    height: 100%;
    min-height: 70vh;
    padding: 50px;
    .page-con_box {
      .titles {
        font-size: 20px;
        padding: 10px;
        color: @color-text-black;
        font-weight: bolder;
        display: flex;
        align-items: center;
      }
      // myself
      .contents-myself {
        padding-left: 40px;
        color: @color-text-grayer;
        text-align: left;
        line-height: 30px;
        margin-bottom: 10px;
      }
      // education
      .contents-education {
        padding-left: 40px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .row-msg {
          text-align: left;
          margin-top: 10px;
          .name {
            font-size: 20px;
          }
          .time {
            color: @color-text-gray;
            font-size: 12px;
            padding-left: 20px;
          }
          .desc {
            color: @color-text-grayer;
            padding-top: 5px;
            span {
              padding-right: 10px;
            }
          }
        }
      }
      // experience
      .contents-experience {
        padding-left: 40px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        text-align: left;
        div {
          padding: 2px 0;
        }
        .time {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: @color-text-gray;
        }
      }
    }
  }
}
/* 控制器 */
.controller {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 100px;
  div {
    padding: 0px 20px;
  }
}
</style>
