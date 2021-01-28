<!-- 回复组件 -->
<template>
  <div>
    <div class="container">
      <div>
        <el-input v-model="textarea" @keyup.enter.native="sendInfo" @blur="onBlur" ref="textarea" :id="'textarea'+clickId"  placeholder="请输入内容"></el-input>
      </div>
      <div class="control">
        <div class="control-box">
          <div class="face">
            <el-popover placement="bottom" width="250" trigger="click">
              <div>
                <div class="emotionList">
                  <a
                    href="javascript:void(0);"
                    @click="getEmo(index)"
                    v-for="(item, index) in faceList"
                    :key="index"
                    class="emotionItem"
                    >{{ item }}</a
                  >
                </div>
              </div>
              <div slot="reference">
                <i class="el-icon-picture-outline-round" ></i>表情
              </div>
            </el-popover>
          </div>
        </div>
        <div>
          <el-button type="primary" plain @click="submitRepData" >评论</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const appData = require("@/assets/other/emoji.json");
export default {
  name: "UE",
  data() {
    return {
      faceList: [],//emoj列表
      textarea: "",//输入内容
    };
  },
  props:{
    pid:'',//文章id
    fid:'',//评论父级id
    clickId:""//评论id
  },
  methods: {
    getEmo(index) {
      let textareaId = 'textarea'+this.clickId
      const textArea = document.getElementById(textareaId);
      //const textArea = this.$refs.textarea
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length;
          textArea.focus();
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }
      changeSelectedText(textArea, this.faceList[index]);
      this.textarea = textArea.value; // 要同步data中的数据
      return;
    },
    onBlur(value){
      console.log('输入完毕',value)
      this.$store.commit('communityResponseValueGet',this.textarea)
    },
    //提交评论数据
    submitRepData() {
      const params = { 
        pid: this.pid,
        fid: this.fid ,
        name:'测试员',
        content:this.textarea,
      };
      console.log(params)
      //return false
      this.$Request
        .requestPost(params, this.$api.apiCommunity.rep_add)
        .then((res) => {
          console.log(res);
          this.textarea = ''
          this.$message("评论成功");
          this.$parent.getRepData()
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  mounted() {
    for (let i in appData) {
      this.faceList.push(appData[i].char);
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .control {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .control-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .face {
        color: #409eff;
      }
    }
  }
}
</style>
<style lang="scss">
/* el-popover是和app同级的，所以scoped的局部属性设置了无效 */
/* 需要设置全局style */
  .el-popover{
    height:200px;
    width:400px;
    overflow: scroll;
    overflow-x:auto;
  }
</style>

<style scoped>
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList{
  display: flex;
  flex-wrap: wrap;
  padding:5px;
}
.emotionItem{
  width:10%;
  font-size:20px;
  text-align:center;
}
/*包含以下四种的链接*/
.emotionItem {
    text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
    text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
    text-decoration: none;
}
</style>
