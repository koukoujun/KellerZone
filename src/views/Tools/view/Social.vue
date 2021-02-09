<template>
  <div class="feedback">
    <!-- head -->
    <Tab-navigation
     :tabMsgList='tabMsgList'
     :tabBtnList='tabBtnList'
     @dialogShow="dialogShow"
    ></Tab-navigation>
    <!-- content -->
    <div class="content">
      <div v-for="(itemArr, indexArr) in listData" :key="indexArr">
        <div class="row-title" >
          <i class="el-icon-price-tag"></i><span>&nbsp;{{itemArr.title}}</span>
        </div>
        <div class="row-con" >
          <div class="card" v-for="(item,index) in itemArr.content" :key="index" @click="onClick(item.url)">
            <div class="title" >
              <img :src="item.icon"><span>{{ item.name }}</span>
            </div>
            <div class="desc" >{{item.desc}}</div>
          </div>
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
          <el-form-item label="地区">
            <el-cascader style="width:100%"
              @change="selectChange"
              :options="options"
              :props="{ checkStrictly: true }"
              clearable></el-cascader>
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

<script lang="js">
import AMap from 'AMap';
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
      /* 参数 */
      listData: [],
      selectOption: [
        {id:1,name:'社保'},
        {id:2,name:'公积金'}
      ],
      dialogVisible: false,
      form: {
        name: "",
        desc: "",
        url: "",
        icon: "",
        type: "",
        area: ""
      },
      provinceData:[],//省份数据
      cityData:[],//城市数据
      options: [], //选择地区
      locationCity:'',//定位用户城市
    };
  },
  methods: {
    //get optin data
    getOptionData(){
      const params = {
        type:'2'
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
    getProvince(){
      this.$Request
        .requestPost({}, this.$api.common.province)
        .then((res) => {
          console.log(res);
          this.provinceData = res.data.data
          this.getCity()
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getCity(){
      const that = this
      this.$Request
        .requestPost({}, this.$api.common.city)
        .then((res) => {
          console.log(res);
          this.cityData = res.data.data
          that.provinceData.map((item)=>{
            Object.assign(item,{value:item.province,label:item.province,children:[]})
          })
          that.cityData.map((item)=>{
            Object.assign(item,{value:item.city,label:item.city})
          })
          that.provinceData.map((itema)=>{
            that.cityData.map((itemb)=>{
              if(itemb.provinceid == itema.provinceid){
                itema.children.push(itemb)
              }
            })
          })
          that.options = that.provinceData
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //get init  data
    getData(data) {
      const params = {
        area:this.locationCity
      };
      this.$Request
        .requestPost(params, this.$api.tools.list_social)
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
        .requestPost(params, this.$api.tools.add_social)
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
    selectChange(e){
      console.log(e.toString())
      this.form.area = e.toString()
    },
    Controller(name, type) {
      switch (name) {
        case "home":
          this.$router.push("/");
          break;
        default:
          break;
      }
    },
    getLocation() {
        const self = this
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
            })

            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);

            function onComplete(data) {
                // data是具体的定位信息
                console.log('定位成功信息：', data);
                if(data.addressComponent){
                  self.locationCity = data.addressComponent.city
                  self.getData()
                }else{
                  self.$message.error('当前定位失败，暂无法提供社会服务');
                }
            }

            function onError(data) {
                // 定位出错
                console.log('定位失败错误：', data);
                // 调用ip定位
                self.getLngLatLocation();
            }
        })
    },
    getLngLatLocation() {
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    console.log('通过ip获取当前城市：', result)
                    //逆向地理编码
                    AMap.plugin('AMap.Geocoder', function () {
                        var geocoder = new AMap.Geocoder({
                            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                            city: result.adcode
                        })

                        var lnglat = result.rectangle.split(';')[0].split(',');
                        geocoder.getAddress(lnglat, function (status, data) {
                            if (status === 'complete' && data.info === 'OK') {
                                // result为对应的地理位置详细信息
                                console.log(data)
                            }
                        })
                    })
                }
            })
        })
    }
  },
  created() {
    this.getOptionData()
    this.getProvince()
    this.getLocation();
  },
};
</script>

<style scoped lang="less">
@color-border: rgba(204, 204, 204, 0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
/* 内容 */
.content {
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-wrap: wrap;
  width: 80vw;
  margin-left: 10vw;
  box-shadow: 0 0 20px 4px rgba(204, 204, 204, 0.4);
  margin-top: 150px;
  margin-bottom: 40px;
}
.content .row-title{
  text-align: left;
  padding: 20px 0 0 20px ;
  font-size: 20px;
  font-weight: bolder;
  color: #409EFF;
}
.content .row-con{
  display: flex;
  flex-direction: row;
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
