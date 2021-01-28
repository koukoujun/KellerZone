<template>
  <div class="works-compile">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
     @publishEssay='publishEssay'
    ></Tab-navigation>
    <!-- content -->
    <div class="content">
      <el-form
        ref="form"
        label-width="80px"
        v-for="(item, index) in formData"
        :key="index"
      >
        <!-- title -->
        <div class="title" v-if="item.title">{{ item.title }}</div>
        <div
          class="box_title"
          v-if="index == 'jobExp' || index == 'projectExp'"
        >
          <div class="title">{{ item[0].name.title }}</div>
          <div>
            <i
              class="el-icon-circle-plus-outline"
              @click="controller('add', index)"
            ></i>
          </div>
        </div>
        <!-- input -->
        <el-form-item :label="item.label" v-if="item.mold == 'input'">
          <el-input
            v-model="item.value"
            :placeholder="item.showMsg + item.msg"
          ></el-input>
        </el-form-item>
        <!-- select -->
        <el-form-item :label="item.label" v-if="item.mold == 'select'">
          <el-select
            v-model="item.value"
            :placeholder="item.showMsg + item.msg"
          >
            <el-option
              v-for="(item_select, index_select) in selectOption[item.name]"
              :key="index_select"
              :label="item_select.label"
              :value="item_select.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- textarea -->
        <el-form-item
          :label="item.label"
          prop="desc"
          v-if="item.mold == 'textarea'"
        >
          <el-input
            type="textarea"
            v-model="item.value"
            :placeholder="item.showMsg + item.msg"
          ></el-input>
        </el-form-item>
        <!-- 多组添加 -->
        <div v-if="index == 'jobExp' || index == 'projectExp'">
          <!-- 循环一 -->
          <div v-for="(item_job, index_job) in item" :key="index_job">
            <div class="box_title_second">
              <div class="title_second">
                {{ item_job.name.title }}{{ index_job + 1 }}
              </div>
              <div>
                <i
                  class="el-icon-delete"
                  v-if="index_job > 0"
                  @click="controller('delete', index, index_job)"
                ></i>
              </div>
            </div>
            <!-- 循环二 -->
            <div
              v-for="(item_job_in, index_job_in) in item_job"
              :key="index_job_in"
            >
              <!-- input -->
              <el-form-item
                :label="item_job_in.label"
                v-if="item_job_in.mold == 'input'"
              >
                <el-input
                  v-model="item_job_in.value"
                  :placeholder="item_job_in.showMsg + item_job_in.msg"
                ></el-input>
              </el-form-item>
              <!-- textarea -->
              <el-form-item
                :label="item_job_in.label"
                prop="desc"
                v-if="item_job_in.mold == 'textarea'"
              >
                <el-input
                  type="textarea"
                  v-model="item_job_in.value"
                  :placeholder="item_job_in.showMsg + item_job_in.msg"
                ></el-input>
              </el-form-item>
              <!-- time -->
              <el-form-item
                :label="item_job_in.label"
                v-if="item_job_in.mold == 'time'"
              >
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    :placeholder="item_job_in.showMsg + item_job_in.msg"
                    v-model="item_job_in.value"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
import formData from "../assets/compileData.js";
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "works-compile",
  data() {
    return {
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'简历列表',path:'/works/resume'},
        {name:'个人作品',path:'/works/invalid_works'}
      ],
      //按钮列表
      tabBtnList:[
        {name:'发布',type:'func',func:'publishEssay',path:''}
      ],
      /* 参数 */
      id:'',
      type:'',
      formData: formData,
      selectOption: {
        sex: [
          { label: "男", value: "男" },
          { label: "女", value: "女" },
        ],
      },
    };
  },
  methods: {
    getIntData(id) {
      const params = {
        id: id
      };
      this.$Request
        .requestPost(params, this.$api.apiWorks.resume)
        .then((res) => {
          console.log(res);
          let resData = res.data.data
          for(let item in this.formData){
            if(item != 'jobExp'&&item != 'projectExp'){
              formData[item].value = resData[item]
            }
          }
          let jobExpData = resData.jobExp
            jobExpData.map((item,indexs)=>{
              let jobExpDemo = {
              name:{title:'工作经历',name: 'name', value:'',label: '工作地点', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '工作地点', errorMsg: "请填写", showMsg: '请填写' },
              content:{name: 'content', value:'',label: '工作内容', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'textarea', type: '', maxlength: '', msg: '工作内容', errorMsg: "请填写", showMsg: '请填写' },
              start_time:{name: 'start_time', value:'',label: '开始时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '开始时间', errorMsg: "请填写", showMsg: '请填写' },
              end_time:{name: 'end_time', value:'',label: '结束时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '结束时间', errorMsg: "请填写", showMsg: '请填写' },
            }
            for(let items in jobExpDemo){
              jobExpDemo[items].value = item[items]
            }
            this.formData.jobExp.push(jobExpDemo)
          })
          let projectExpData = resData.projectExp
            projectExpData.map((item,indexs)=>{
              let projectExpDemo = {
                name:{title:'项目经历',name: 'name', value:'',label: '工作地点', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '工作地点', errorMsg: "请填写", showMsg: '请填写' },
                title:{name: 'title', value:'',label: '项目名称', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'input', type: '', maxlength: '', msg: '项目名称', errorMsg: "请填写", showMsg: '请填写' },
                content:{name: 'content', value:'',label: '项目内容', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'textarea', type: '', maxlength: '', msg: '项目内容', errorMsg: "请填写", showMsg: '请填写' },
                start_time:{name: 'start_time', value:'',label: '开始时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '开始时间', errorMsg: "请填写", showMsg: '请填写' },
                end_time:{name: 'end_time', value:'',label: '结束时间', checkRule: /^[\s\S]*.*[^\s][\s\S]*$/, mold: 'time', type: '', maxlength: '', msg: '结束时间', errorMsg: "请填写", showMsg: '请填写' },
              }
              for(let items in projectExpDemo){
                projectExpDemo[items].value = item[items]
              }
              this.formData.projectExp.push(projectExpDemo)
            })
            this.formData.jobExp.splice(0,1)
            this.formData.projectExp.splice(0,1)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // submit data
    submitData(data) {
      const params = data;
      this.$Request
        .requestPost(params, this.$api.apiWorks.resume_add)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "success",
            center: true,
          });
          setTimeout(() => {
            this.$router.push("/works");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // compile data
    compileData(data){
      const params = data;
      this.$Request
        .requestPost(params, this.$api.apiWorks.resume_compile)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "success",
            center: true,
          });
          setTimeout(() => {
            //window跳转初始化formdata数据
            window.location.href='/works'
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //发布文章
    publishEssay(){
      if(this.type == 'add'){
        //时间格式转化
        this.formData.jobExp.map((item) => {
          item.start_time.value = this.timeFormat(item.start_time.value);
          item.end_time.value = this.timeFormat(item.end_time.value);
        });
        this.formData.projectExp.map((item) => {
          item.start_time.value = this.timeFormat(item.start_time.value);
          item.end_time.value = this.timeFormat(item.end_time.value);
        });
      }
      //数据深拷贝
      let data = this.deepClone(this.formData);
      console.log("提交数据", data);
      for (let item in data) {
        if (item == "jobExp" || item == "projectExp") {
          data[item].map((item_a, index) => {
            for (let item_b in item_a) {
              item_a[item_b] = item_a[item_b].value;
            }
          });
        } else {
          data[item] = data[item].value;
        }
      }
      data.jobExp = JSON.stringify(data.jobExp);
      data.projectExp = JSON.stringify(data.projectExp);
      if(this.type == 'add'){
          this.submitData(data);
      }else if(this.type == 'compile'){
          this.compileData(Object.assign(data,{id:this.id}));
      }  
      console.log("结果", data);
      console.log("原型结果", this.formData);
    },
    // 定义一个深拷贝函数  接收目标target参数（递归方式）
    deepClone(target) {
      // 定义一个变量
      let result;
      // 如果当前需要深拷贝的是一个对象的话
      if (typeof target === "object") {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
          result = []; // 将result赋值为一个数组，并且执行遍历
          for (let i in target) {
            // 递归克隆数组中的每一项
            result.push(this.deepClone(target[i]));
          }
          // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
          result = null;
          // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
          result = target;
        } else {
          // 否则是普通对象，直接for in循环，递归赋值对象的所有值
          result = {};
          for (let i in target) {
            result[i] = this.deepClone(target[i]);
          }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
      } else {
        result = target;
      }
      // 返回最终结果
      return result;
    },
    // 时间格式转化
    timeFormat(date) {
      if (date && date != "") {
        const nowdate = date.toLocaleDateString().replace(/\//g, "-");
        return nowdate;
      }
    },
    // controller
    controller(name, index, id) {
      switch (name) {
        case "add":
          const jobExpItem = {
            name: {
              title: "工作经历",
              name: "name",
              label: "工作地点",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "input",
              type: "",
              maxlength: "",
              msg: "工作地点",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            content: {
              name: "content",
              label: "工作内容",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "textarea",
              type: "",
              maxlength: "",
              msg: "工作内容",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            start_time: {
              name: "start_time",
              label: "开始时间",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "time",
              type: "",
              maxlength: "",
              msg: "开始时间",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            end_time: {
              name: "end_time",
              label: "结束时间",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "time",
              type: "",
              maxlength: "",
              msg: "结束时间",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
          };
          const projectExpItem = {
            name: {
              title: "项目经历",
              name: "name",
              label: "工作地点",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "input",
              type: "",
              maxlength: "",
              msg: "工作地点",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            title: {
              name: "title",
              label: "项目名称",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "input",
              type: "",
              maxlength: "",
              msg: "项目名称",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            content: {
              name: "content",
              label: "项目内容",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "textarea",
              type: "",
              maxlength: "",
              msg: "项目内容",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            start_time: {
              name: "start_time",
              label: "开始时间",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "time",
              type: "",
              maxlength: "",
              msg: "开始时间",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
            end_time: {
              name: "end_time",
              label: "结束时间",
              checkRule: /^[\s\S]*.*[^\s][\s\S]*$/,
              mold: "time",
              type: "",
              maxlength: "",
              msg: "结束时间",
              errorMsg: "请填写",
              showMsg: "请填写",
            },
          };
          this.$notify({
            title: "成功",
            message: "添加成功",
            type: "success",
            duration: 1000,
          });
          if (index == "jobExp") {
            this.formData.jobExp.push(jobExpItem);
          } else if (index == "projectExp") {
            this.formData.projectExp.push(projectExpItem);
          }
          break;
        case "delete":
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          if (index == "jobExp") {
            this.formData.jobExp.splice(id, 1);
          } else if (index == "projectExp") {
            this.formData.projectExp.splice(id, 1);
          }
          break;
        case "submit":
          if(this.type == 'add'){
            //时间格式转化
            this.formData.jobExp.map((item) => {
              item.start_time.value = this.timeFormat(item.start_time.value);
              item.end_time.value = this.timeFormat(item.end_time.value);
            });
            this.formData.projectExp.map((item) => {
              item.start_time.value = this.timeFormat(item.start_time.value);
              item.end_time.value = this.timeFormat(item.end_time.value);
            });
          }
          //数据深拷贝
          let data = this.deepClone(this.formData);
          console.log("提交数据", data);
          for (let item in data) {
            if (item == "jobExp" || item == "projectExp") {
              data[item].map((item_a, index) => {
                for (let item_b in item_a) {
                  item_a[item_b] = item_a[item_b].value;
                }
              });
            } else {
              data[item] = data[item].value;
            }
          }
          data.jobExp = JSON.stringify(data.jobExp);
          data.projectExp = JSON.stringify(data.projectExp);
          if(this.type == 'add'){
             this.submitData(data);
          }else if(this.type == 'compile'){
             this.compileData(Object.assign(data,{id:this.id}));
          }  
          console.log("结果", data);
          console.log("原型结果", this.formData);
          break;
        case "works":
          this.$router.push("/works");
          break;
        case "home":
          this.$router.push("/");
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
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    if(this.type == 'compile'){
      this.getIntData(this.id)
      document.title = '编辑简历'
    }else{
      document.title = '添加简历'
    }
  },
};
</script>

<style scoped lang="less">
@color-border: rgba(204, 204, 204, 0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
//content
.content {
  width: 70%;
  height: auto;
  margin-left: 15%;
  margin-top: 140px;
  text-align: left;
  p {
    font-weight: bolder;
    font-size: 24px;
  }
  .rich-content {
    background-color: #ffffff;
    height: 60vh;
  }
  .rich-content-inner {
    height: 94%;
  }
}
.content .box_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.content .title {
  font-size: 18px;
  font-weight: bolder;
  margin-left: 30px;
  padding: 20px 0;
}
.content .box_title_second {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.content .title_second {
  font-size: 14px;
  font-weight: bolder;
  margin-left: 30px;
  padding: 20px 0;
}
</style>
