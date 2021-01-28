<template>
  <div class="code">
    <div class="camera_box" v-show="uploadType=='camera'" >
      <el-button type="primary" plain>拍照</el-button>
      <div
        ref="input_camera"
        id="file_camera"
        class="input_simulate camera"
      ></div>
    </div>
    <div class="image_box" v-show="uploadType=='file'">
      <el-button type="primary" plain>从相册选择</el-button>
      <div ref="input_image" id="file" class="input_simulate image"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Compress } from '@/assets/js/upload.js'

export default {
  name: "upload",
  data() {
    return {
      //单文件选择
      imageSingle:{
          url:'',
          file:''
      },
      //多文件选择
      imageList:[]
    };
  },
  props:{
   uploadType:String
  },
  methods: {
    //选择图片
    chooseImage(index, file) {
      console.log(file)
      const that = this;
      const len = file.length;
      for (let i = 0; i < len; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(file[i]);
        reader.onload = function (e) {
          const fileObj = file[i];
          //大于5M，禁止上传
          if (fileObj.size / 1024 > 1024*5) {
            that.$message({
                message: '请选择小于5M的图片进行上传~',
                type: 'warning'
            });
          }
          //进行压缩上传
          else {
            Compress(fileObj, (base64Codes) => {
              console.log(base64Codes)
              //单文件
              that.imageSingle.url = base64Codes.dataurl 
              that.imageSingle.file = base64Codes.file
              //多文件
              that.imageList.push({url:base64Codes.dataurl,file:base64Codes.file})
              //传给父组件
              that.parentVal()
            });
          }
        };
      }
    },
    //传值给父组件
    parentVal(){
      this.$emit("getChildVal",this.imageSingle)
    },
    controller(name, index) {
      switch (name) {
        case "create_element":
          const input_image:any = document.createElement("input");
          // 创建选择照片元素
          input_image.type = "file";
          input_image.accept = "image/*";
          input_image.multiple = "multiple";
          input_image.onchange = (file) => {
            this.chooseImage(index, file.target.files);
          };
          this.$refs.input_image.appendChild(input_image);
          //创建拍照元素
          const input_camera:any = document.createElement("input");
          input_camera.type = "file";
          input_camera.accept = "image/*";
          input_camera.capture = "camera";
          input_camera.onchange = (file) => {
            let files = file.target.files[0];
            let FileList = { 0: files, length: 1 };
            this.chooseImage(index, FileList);
          };
          this.$refs.input_camera.appendChild(input_camera);
          break;
      }
    },
  },
  mounted() {
    this.controller("create_element");
  },
};
</script>

<style scoped lang="less">
.input_simulate{
position: absolute;
margin-top: -35px;
margin-left: 20px;
opacity: 0;
}
</style>
