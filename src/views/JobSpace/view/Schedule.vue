<template>
  <div class="jobspaceschedule">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
    ></Tab-navigation>
    <!-- content -->
    <div class="content"  >
       <div class="content-box" v-for="(itemArr,indexArr) in dataList" :key="indexArr">
         <div class="content-box-tab" >
           <div>
             <i class="el-icon-folder-opened" v-if="itemArr.type=='待做'" ></i>
             <i class="el-icon-document" v-if="itemArr.type=='进行中'"></i>
             <i class="el-icon-document-checked" v-if="itemArr.type=='已完成'"></i>
             <i class="el-icon-price-tag" v-if="itemArr.type=='标签'" ></i>
             <span>&nbsp;{{itemArr.type}}</span>
            </div>
           <div><i class="el-icon-circle-plus-outline" @click="Controller('add',itemArr.type)"  ></i></div>
          </div>
         <div class="content-box-con" v-for="(item,index) in itemArr.content" :key="index" >
           <div class="font-limits" @click="Controller('card',indexArr,index,item.id)" >{{item.content}}</div>
         </div>
       </div>
    </div>
    <!--  -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%">
      <!-- content -->
      <div class="dialog-content">
        <div class="dialog-content-row safe-space" >
          <div>
            <el-select v-model="cardForm.type" placeholder="请选择类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button v-if="isShowDeleteBtn" type="danger" size="mini" icon="el-icon-delete" circle @click="deleteData" ></el-button>
          </div>
        </div>
      </div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容..."
        v-model="cardForm.content">
      </el-input>
      <div class="dialog-content-row dialog-content-mart20">
        <div>开始时间：{{startTime}}</div>
        <div>结束时间：{{endTime}}</div>
      </div>
      <!-- footer -->
      <span slot="footer" class="dialog-footer">
        <el-button  @click="Controller('cancel')">取 消</el-button>
        <el-button type="primary" @click="Controller('submit')" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Alert } from "element-ui";
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "JobSpaceSchedule",
  data() {
    return {
      value:'',
      /* 导航配置 */
      //导航列表
      tabMsgList:[
        {name:'事项管理',path:'/jobspace/schedule'},
        {name:'职业科普',path:'/jobspace/science'}
      ],
      /* 参数 */
      dataList:[
        {type:'待做',content:[]},
        {type:'进行中',content:[]},
        {type:'已完成',content:[]},
        {type:'标签',content:[]},
      ],
      options: [{
          value: '0',
          label: '待做'
        }, {
          value: '1',
          label: '进行中'
        }, {
          value: '2',
          label: '已完成'
        }, {
          value: '3',
          label: '标签'
        }],
      dialogVisible:false,//显示编辑器
      isShowDeleteBtn:false,//显示删除按钮
      cardId:'',//卡片id
      conType:'add',//操作类型
      startTime:'',//开始时间
      endTime:'',//结束时间
      //card 内容
      cardForm:{
        type:'0',
        content:''
      }
    };
  },
  methods: {
    // get init data
    getData() {
      const params = {};
      this.$Request
        .requestPost(params, this.$api.apiJobSpace.schedule_list)
        .then((res) => {
          console.log(res);
          let arrData = res.data.data;
          arrData.map((item)=>{
            switch(item.type){
              case '0': 
                item.type = '待做'
                this.dataList[0].content = item.content
              break;
              case '1': 
                item.type = '进行中'
                this.dataList[1].content = item.content
              break;
              case '2': 
                item.type = '已完成'
                this.dataList[2].content = item.content
              break;
              case '3': 
                item.type = '标签'
                this.dataList[3].content = item.content
              break;
              default: 
              break;
            }
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // submit code data
    submitData() {
      switch(this.cardForm.type){
        case '待做':
          this.cardForm.type = 0
          break;
        case '进行中':
          this.cardForm.type = 1
          break;
        case '已完成':
          this.cardForm.type = 2
          break;
        case '标签':
          this.cardForm.type = 3
          break;
      }
      const params = this.cardForm;
      this.$Request
        .requestPost(params, this.$api.apiJobSpace.schedule_add)
        .then((res) => {
          console.log(res);
          this.resetData()
          this.dialogVisible = false
          this.getData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // update code data
    updateData() {
      const params = Object.assign(this.cardForm,{id:this.cardId});
      this.$Request
        .requestPost(params, this.$api.apiJobSpace.schedule_update)
        .then((res) => {
          console.log(res);
          this.cardForm.type = '0'
          this.cardForm.content = ''
          this.dialogVisible = false
          this.dataList=[
            {type:'待做',content:[]},
            {type:'进行中',content:[]},
            {type:'已完成',content:[]},
            {type:'标签',content:[]},
          ]
          this.getData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // update code data
    deleteData() {
      const params = {id:this.cardId};
      this.$Request
        .requestPost(params, this.$api.apiJobSpace.schedule_delete)
        .then((res) => {
          console.log(res);
          this.cardForm.type = '0'
          this.cardForm.content = ''
          this.dialogVisible = false
          this.dataList=[
            {type:'待做',content:[]},
            {type:'进行中',content:[]},
            {type:'已完成',content:[]},
            {type:'标签',content:[]},
          ]
          this.getData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetData(){
      this.cardForm.type = ''
      this.cardForm.content = ''
      this.startTime = ''
      this.endTime = ''
    },
    handleClose(done){
      done()
      this.isShowDeleteBtn = false
      this.resetData()
    },
    // controller
    Controller(name,param1,param2,param3,param4) {
      switch (name) {
        case "add":
          this.conType = 'add'
          this.dialogVisible = true
          this.cardForm.type = param1
          break;
        case "card":
          this.conType = 'update'
          this.cardId = param3
          this.cardForm.type = this.dataList[param1].content[param2].type
          this.cardForm.content = this.dataList[param1].content[param2].content
          this.startTime = this.dataList[param1].content[param2].create_time
          this.endTime = this.dataList[param1].content[param2].end_time
          this.isShowDeleteBtn = true
          this.dialogVisible = true
          break;
        case "cancel":
          this.isShowDeleteBtn = false
          this.dialogVisible = false
          this.resetData()
          break;
        case 'submit':
          if(this.conType == 'add'){
            this.submitData()
          }else{
            this.updateData()
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
    this.getData()
  }
};
</script>

<style scoped lang="less">
@color-blue-one:#b3d8ff;
@color-gray-one:#cccccc;
.font-limits{
 overflow: hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient: vertical;
}
.content {
  margin-top: 140px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70vw;
  margin-left: 15vw;
}
.content .content-box{
  background-color: white;
  width: 20%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px 4px rgba(204, 204, 204, 0.4);
}
.content .content-box .content-box-tab{
 padding-bottom: 20px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
}
.content .content-box .content-box-con{
 background-color: rgba(@color-gray-one, 0.4) ;
 border-radius: 4px;
 padding: 10px;
 margin-bottom: 10px;
 text-align:left;
}
/* ui style add*/
.dialog-content{
  text-align: left;
  .safe-space{
    margin-bottom: 20px;
  }
}
.dialog-content-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.dialog-content-mart20{
  margin-top: 20px;
}
</style>
