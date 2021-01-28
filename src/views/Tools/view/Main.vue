<template>
  <div class="feedback">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
     @dialogShow="dialogShow"
    ></Tab-navigation>
    <!-- 标签 -->
    <div class="sign-tab">
      <el-tag
        v-for="(item, index) in selectOption"
        :key="index"
        style="margin: 0 15px 15px 0"
        @click="Controller('sign_tab', item.name)"
        >{{ item.name }}</el-tag
      >
      <el-tag @click="Controller('all')" >查看全部</el-tag>
    </div>
    <!-- content -->
    <div class="content">
      <div v-for="(item, index) in listData" :key="index">
        <div class="card" @click="onClick(item.url)" v-if="item.show == true">
          <div class="title" >
            <img :src="item.icon"><span>{{ item.name }}</span>
          </div>
          <div class="desc" >{{item.desc}}</div>
        </div>
      </div>
      <div class="empty" v-if="listData.length==0" >
          <div>暂无数据</div>
       </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select
              v-model="form.type"
              placeholder="请选择类别"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in selectOption"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "feedback",
  data() {
    return {  
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'职业工具',path:'/tools'},
        {name:'社会服务',path:'/tools/social'}
      ],
      //按钮列表
      tabBtnList:[
        {name:'添加',type:'func',func:'dialogShow',path:''}
      ],
      //参数
      listData: [],
      tabType:'',
      selectOption: [],
      dialogVisible: false,
      form: {
        name: "",
        desc: "",
        url: "",
        icon: "",
        type: "",
      },
    };
  },
  methods: {
    //get optin data
    getOptionData(){
      const params = {
        type:'1'
      }
      this.$Request
        .requestPost(params, this.$api.tools.option)
        .then((res) => {
          console.log(res);
          this.selectOption = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //get init  data
    getData(data) {
      if(data == 'empty'){
        this.tabType = ''
      }
      const params = {
        type:this.tabType
      };
      this.$Request
        .requestPost(params, this.$api.tools.list)
        .then((res) => {
          console.log(res);
          this.listData = res.data.data;
          this.listData.map((item) => {
            Object.assign(item, { show: true });
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //submit data
    submitData() {
      if (this.form.name == "") {
        this.$message("请填写名称");
        return false;
      } else if (this.form.url == "") {
        this.$message("请填写链接");
        return false;
      }
      const params = this.form;
      this.$Request
        .requestPost(params, this.$api.tools.add)
        .then((res) => {
          console.log(res);
          this.$message("添加成功");
          this.form =  {
            name: "",
            desc: "",
            url: "",
            icon: "",
            type: "",
          },
          this.dialogVisible = false, 
          this.getData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //dialogShow
    dialogShow(){
      this.dialogVisible = true
    },
    onClick(url) {
      window.open(url)
    },
    Controller(name, type) {
      switch (name) {
        case "home":
          this.$router.push("/");
          break;
        case "sign_tab":
          this.tabType = type
          this.getData()
          break;
        case "all":
          this.tabType = '' 
          this.getData()
        break;
        default:
          break;
      }
    },
  },
  created() {
    this.getOptionData()
    this.getData();
  },
};
</script>

<style scoped lang="less">
@color-border: rgba(204, 204, 204, 0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
/* 标签 */
.sign-tab {
  width: 80vw;
  margin-left: 10vw;
  text-align: left;
  margin-top: 150px;
}
/* 内容 */
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  width: 80vw;
  margin-left: 10vw;
  box-shadow: 0 0 20px 4px rgba(204, 204, 204, 0.4);
  margin-top: 40px;
  margin-bottom: 40px;
}
.content .card {
  width: 10.3vw;
  height: 6vw;
  padding: 0.1rem;
  margin: 1vw;
  border: 0.1vw solid #99ccff;
  background-color: rgba(153, 204, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .title{
    display: flex;
    flex-direction: row;
    text-align: left;
    align-items: center;
    img{
      width: 40px;
      margin-right: 10px;
    }
    span{
      font-size: 16px;
      color: #409EFF;
    }
  }
  .desc{
    text-align: left;
    margin-top: 15px;
    font-size: 12px;
    color: #666666;
  }
}
.content .empty{
  width: 80vw;
  height: 11.1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
}
</style>
