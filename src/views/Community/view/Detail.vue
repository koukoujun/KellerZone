<template>
  <div class="community-detail">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
    ></Tab-navigation>
    <!-- content -->
    <div class="content">
      <div class="container">
        <!-- container-head -->
        <div class="container-head">
          <div class="list-one"><img src="@/assets/img/head.jpg" /></div>
          <div class="list-two">
            <div class="list-two-title">{{ dataDetail.name }}</div>
            <div class="list-two-content">
              {{ dataDetail.time }} 阅读{{ dataDetail.read_count }}
            </div>
          </div>
          <div class="list-three">
            <el-button type="primary" plain>关注</el-button>
          </div>
        </div>
        <!-- container-body -->
        <div class="container-body">
          <div v-html="dataDetail.content"></div>
        </div>
        <!-- container-response -->
        <div class="container-response">
          <div class="container-response_title">评论</div>
          <div class="container-response_box">
            <img src="@/assets/img/head.jpg" />
            <div class="input" >
              <Mold-Response :pid="pid" :fid="0" ></Mold-Response>
            </div>
          </div>

          <!-- resposne-content -->
          <div
            class="container-response_content"
            v-for="(item, index) in responseList"
            :key="index"
          >
            <!-- content -->
            <div>
              <!-- base-基础评论 -->
              <div class="kl-rseponse">
                <div class="kl-response_row_left">
                  <img src="@/assets/img/head.jpg" />
                </div>
                <div class="kl-response_row_right">
                  <div class="kl-response_row_right_name">{{ item.name }}</div>
                  <div class="kl-response_row_right_re">{{ item.content }}</div>
                  <div class="kl-response_row_right_con">
                    <div>{{ item.time }}</div>
                    <div class="kl-response_row_right_con_re">
                      <div>
                        <i class="el-icon-thumb" @click="repAddPraise(item.id)"></i
                        ><span>{{ item.praise_count }}</span>
                      </div>
                      <div @click="controller('add_rep', index,item.id)">
                        <i class="el-icon-chat-square"></i><span>回复</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <!-- base回复模块 -->
                    <Mold-Response :pid="pid" :fid="fid" :clickId="item.id" v-show="index == clickIndex"></Mold-Response>
                  </div>
                </div>
              </div>
              <!-- 一级评论回复 -->
              <div
                class="kl-response_second"
                v-for="(item_one, index_one) in item.children"
                :key="'rep_one' + index_one"
              >
                <div class="kl-rseponse">
                  <div class="kl-response_row_left">
                    <img src="@/assets/img/head.jpg" />
                  </div>
                  <div class="kl-response_row_right">
                    <div class="kl-response_row_right_name">
                      {{ item_one.name }}
                    </div>
                    <div class="kl-response_row_right_re">
                      回复：{{ item_one.content }}
                    </div>
                    <div class="kl-response_row_right_con">
                      <div>{{ item_one.time }}</div>
                      <div class="kl-response_row_right_con_re">
                        <div>
                          <i class="el-icon-thumb" @click="repAddPraise(item_one.id)"></i>
                          <span>{{ item_one.praise_count }}</span>
                        </div>
                        <div @click="controller('add_rep_one', index_one,item_one.id)">
                          <i class="el-icon-chat-square"></i><span>回复</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <!-- 回复模块2 -->
                      <Mold-Response
                      :pid="pid" :fid="fid" :clickId="item_one.id"
                        v-show="index_one == clickIndexOne"
                      ></Mold-Response>
                    </div>
                  </div>
                </div>

                <!-- 二级评论回复 -->
                <div
                  class="kl-response_second"
                  v-for="(item_two, index_two) in item_one.children"
                  :key="'rep_two' + index_two"
                >
                  <div class="kl-rseponse">
                    <div class="kl-response_row_left">
                      <img src="@/assets/img/head.jpg" />
                    </div>
                    <div class="kl-response_row_right">
                      <div class="kl-response_row_right_name">
                        {{ item_two.name }}
                      </div>
                      <div class="kl-response_row_right_re">
                        回复：{{ item_two.content }}
                      </div>
                      <div class="kl-response_row_right_con">
                        <div>{{ item_two.time }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="label"></div>
    </div>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
const Response = () => import("../components/response.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
    "Mold-Response": Response,
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
        {name:'写文章',type:'link',func:'',path:'/community/compile'},
      ],
      /* 参数 */
      clickIndex: null,
      clickIndexOne: null,
      clickId: "", //评论id
      msg: "",
      pid: "", //文章id
      fid: "", //评论父级id
      dataDetail: "",
      responseList: [],
    };
  },
  computed: {
    listenResponseVal() {
      return this.$store.state.communityResponseValue;
    }
  },
  watch:{
    listenResponseVal(val){
      console.log('监听',val)
      if(val == ''){
        this.clickIndex = null
        this.clickIndexOne = null
      }
    }
  },
  methods: {
    // get init data
    getData() {
      const params = { id: this.pid };
      this.$Request
        .requestPost(params, this.$api.apiCommunity.article_detail)
        .then((res) => {
          console.log(res);
          this.dataDetail = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //获取评论列表数据
    getRepData() {
      const params = { id: this.pid };
      this.$Request
        .requestPost(params, this.$api.apiCommunity.rep_detail)
        .then((res) => {
          console.log(res);
          this.responseList = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //提交评论内容
    submitRepData(fid) {
      const params = {
        pid: this.pid,
        fid: fid,
        name: "测试员",
        content: this.msg,
      };
      this.$Request
        .requestPost(params, this.$api.apiCommunity.rep_add)
        .then((res) => {
          console.log(res);
          this.getRepData();
          this.$message("评论成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //评论点赞
    repAddPraise(id){
      const params = {
        id: id,
      };
      this.$Request
        .requestPost(params, this.$api.apiCommunity.rep_add_praise)
        .then((res) => {
          console.log(res);
          this.getRepData();
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
    this.pid = this.$route.query.id;
    this.getData();
    this.getRepData();
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
    min-height: 100vh;
    margin-right: 40px;
    background-color: @color-bg;
    border-radius: 4px;
    // head
    .container-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 90%;
      padding: 2% 5%;
      .list-one {
        width: 5%;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: auto;
          border-radius: 60px;
        }
      }
      .list-two {
        width: 25%;
        text-align: left;
        padding-left: 20px;
        .list-two-title {
          font-size: 26px;
          font-weight: bolder;
          color: @color-text-black;
        }
        .list-two-content {
          color: @color-text-grayer;
        }
      }
      .list-three {
        width: 70%;
        text-align: right;
      }
    }
    //body
    .container-body {
      width: 90%;
      padding: 2% 5%;
      font-size: 30px;
      font-weight: bolder;
      color: @color-text-black;
      text-align: left;
    }
    //resposne
    .container-response {
      width: 80%;
      padding: 3% 10%;
      display: flex;
      flex-direction: column;
      .container-response_title {
        width: 100%;
        color: @color-text-gray;
        font-size: 20px;
        text-align: center;
        padding: 20px;
      }
      .container-response_box {
        display: flex;
        flex-direction: row;
        .input{
          width: 96%;
        }
        img {
          width: 4%;
          height: 4%;
          border-radius: 40px;
          margin-right: 2%;
        }
      }
      .container-response_content {
        width: 90%;
        margin-left: 6%;
        margin-top: 40px;
        background-color: rgba(204,204,204,0.1);
        padding: 2%;
        .kl-rseponse;
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
//评论区style
.kl-rseponse {
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  .kl-response_row_left {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 4%;
    padding-right: 20px;
    img {
      width: 100%;
      border-radius: 40px;
      margin-right: 2%;
    }
  }
  .kl-response_row_right {
    width: 96%;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-bottom: 20px;
    .kl-response_row_right_name {
      color: @color-text-black;
      padding-bottom: 5px;
    }
    .kl-response_row_right_re {
      color: @color-text-grayer;
      padding-bottom: 5px;
    }
    .kl-response_row_right_con {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: @color-text-gray;
      .kl-response_row_right_con_re {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        div {
          padding: 0 10px;
          span {
            font-size: 18px;
            padding: 0 5px;
          }
        }
      }
    }
  }
}
.kl-response_second {
  width: 94%;
  margin-left: 6%;
}
</style>
