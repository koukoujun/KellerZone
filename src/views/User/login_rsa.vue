<template>
<div class="htmleaf-container">
	<div class="wrapper">
		<div class="container">
			<!-- 登录 -->
      <div v-if="type=='login'" >
        <h1>Login</h1>
        <form class="form">
          <input v-model="number" type="text" placeholder="请输入账号">
          <input v-model="password" type="password" placeholder="请输入密码">
          <button type="button" @click="userLogin" >登录</button>
          <div class="container-cons">
            <div @click="Controller('register')" >注册账号</div>
            <div @click="Controller('forget_password')">忘记密码</div>
          </div>
        </form>
      </div>
      <!-- 注册- -->
      <div v-if="type=='register'">
        <h1>Register</h1>
        <form class="form">
          <input v-model="number" type="text" placeholder="请输入账号">
          <input v-model="password" type="password" placeholder="请输入密码">
          <div>
            <el-select v-model="job" placeholder="请选择职业类别" style="width:100%;margin-bottom:20px" >
                <el-option
                  style="padding:0 10px"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <button type="button" @click="userRegister" >注册</button>
          <div class="container-cons">
            <div @click="Controller('login')" >登录</div>
            <div @click="Controller('forget_password')">忘记密码</div>
          </div>
        </form>
      </div>

		</div>
		
		<ul class="bg-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</div>
</template>
<script>
import { JSEncrypt } from 'jsencrypt'

export default {
  name: "Home",
  data() {
    return {
      type:'login',//login,register
      number: "", //用户账号
      password: "",//用户密码
      job:"",//用户职业
      options: [{
          value: '1',
          label: '程序员'
        }, {
          value: '2',
          label: '会计'
        }, {
          value: '3',
          label: '销售'
        }, {
          value: '4',
          label: '人事'
        }]
    };
  },
  watch: {
    password(val) {
      this.password = val.substr(0, 15);
    },
  },
  methods: {
    //用户登录
    userLogin() {
      clearTimeout(this.setTimeout)
      const params = {
        user_number:this.number,
        user_password:this.password
      };
      const privateKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDorvAXRx6i5dDhPSbC+SMDKo0f
FQWoK43y8zIjYPsvwyEMtz0Rd0yqq4kGXeSIO/X7Rcsqvmt2EVCGH/aw3AQt0GQd
yb4KTEfYsz56JzyYHGi4ubSwsQP2SR4luPg8vQUzusyxuQ2+6wOpKTAD6mOjlJco
otgGNJu9q1IxtIlqhQIDAQAB
-----END PUBLIC KEY-----`
      let encryptor = new JSEncrypt()
      encryptor.setPublicKey(privateKey)
      let rsaParams = encryptor.encrypt(JSON.stringify(params))//rsaPassWord 就是得出来的加密串
      console.log('加密密匙',rsaParams)
      this.$Request
        .requestPost({rsaParams}, this.$api.apiUser.login)
        .then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            sessionStorage.setItem("token",res.data.data.token);
            this.$router.push({ path: "/" });
          } else {
             this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //用户注册
    userRegister() {
      if(this.number == ''){
        this.$message.warning('请填写账号')
      }else if(this.password == ''){
        this.$message.warning('请填写密码')
      }else if(this.job == ''){
        this.$message.warning('请选择职业类别')
      }else{
        const params = {
          user_number:this.number,
          user_password:this.password,
          user_job:this.job
        };
        const privateKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDorvAXRx6i5dDhPSbC+SMDKo0f
FQWoK43y8zIjYPsvwyEMtz0Rd0yqq4kGXeSIO/X7Rcsqvmt2EVCGH/aw3AQt0GQd
yb4KTEfYsz56JzyYHGi4ubSwsQP2SR4luPg8vQUzusyxuQ2+6wOpKTAD6mOjlJco
otgGNJu9q1IxtIlqhQIDAQAB
-----END PUBLIC KEY-----`
        let encryptor = new JSEncrypt()
        encryptor.setPublicKey(privateKey)
        let rsaParams = encryptor.encrypt(JSON.stringify(params))//rsaPassWord 就是得出来的加密串
        console.log('加密密匙',rsaParams)
        this.$Request
          .requestPost({rsaParams}, this.$api.apiUser.register)
          .then((res) => {
            console.log(res);
            if (res.data.code == "0") {
              this.$router.push({ path: "/" });
              sessionStorage.setItem("token",res.data.data.token);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    Controller(name,param1){
      switch(name){
        case 'login':
          this.type = 'login'
          break;
        case 'register':
          this.type = 'register'
          break;
        case 'forget_password':
          this.$message.warning('此功能暂未开通')
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style>
.el-input__inner{
  padding:0.3rem 0.2rem !important;
}
</style>
<style lang="less" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body ::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
body :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  opacity: 1;
  font-weight: 300;
}
body :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  font-weight: 300;
}
.wrapper {
  background: #ccffff;
  background: -webkit-linear-gradient(top left, #ccffff 0%, #0099ff 100%);
  background: linear-gradient(to bottom right, #ccffff 0%, #0099ff 100%);
  opacity: 0.8;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
      -ms-transform: translateY(85px);
          transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 80px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
          transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
  font-weight: 200;
}
.container-cons{
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin-top: 20px;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 350px;
  border-radius: 3px;
  padding: 15px 15px;
  margin: 0 auto 20px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
  text-align: left;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  color: #409eff;
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 15px 15px;
  color: #409eff;
  border-radius: 3px;
  width: 350px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 20s infinite;
  animation: square 20s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
</style>
