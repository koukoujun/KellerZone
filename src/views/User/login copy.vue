<template>
  <div class="Home">
    <div class="code-screen">
      <div class="code-number">
        <canvas id="matrix"></canvas>
      </div>
      <!-- message -->
      <div class="code-password">
        <!-- 账号 -->
        <div class="code-box">
          <input
            type="text"
            autocomplete="off"
            οnfοcus="this.type='text'"
            v-model="number"
            maxlength="15"
          />
        </div>
        <!-- 密码 -->
        <div class="code-box">
          <input
            type="password"
            autocomplete="off"
            οnfοcus="this.type='password'"
            v-model="password"
            maxlength="15"
          />
          <div v-if="isMsgTrue"><span>{{noticeMsg}}</span></div>
        </div>
        <!-- 登录 -->
        <div class="code-btn" >
          <button @click="userLogin" >登录</button>
          <button @click="userRegister" >注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      isMsgTrue: false, //is msg true notice
      password: "", //code page password
      number: "admin", //code page password
      setTimeout:'',
      noticeMsg:'error'
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
      this.$Request
        .requestPost(params, this.$api.apiUser.login)
        .then((res) => {
          console.log(res);
          if (res.data.code == "1") {
            this.$router.push({ path: "/" });
            sessionStorage.setItem("token",res.data.data.token);
          } else {
            this.noticeMsg = res.data.message
            this.isMsgTrue = true;
            this.setTimeout = setTimeout(() => {
              this.isMsgTrue = false;
            }, 1500);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //用户注册
    userRegister() {
      clearTimeout(this.setTimeout)
      const params = {
        user_number:this.number,
        user_password:this.password
      };
      this.$Request
        .requestPost(params, this.$api.apiUser.add)
        .then((res) => {
          console.log(res);
          if (res.data.code == "1") {
            this.noticeMsg = res.data.message
            this.isMsgTrue = true;
            this.setTimeout = setTimeout(() => {
              this.isMsgTrue = false;
              this.$router.push({ path: "/" });
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify({ number: this.number, password: this.password })
              );
            }, 1500);
          } else {
            this.noticeMsg = res.data.message
            this.isMsgTrue = true;
            this.setTimeout = setTimeout(() => {
              this.isMsgTrue = false;
            }, 1500);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //code protect screen
    codeRain() {
      const matrix = document.getElementById("matrix");
      const context = matrix.getContext("2d");
      matrix.height = window.innerHeight;
      matrix.width = window.innerWidth;
      var drop = [];
      var font_size = 26; //字体
      var columns = matrix.width / font_size;
      for (var i = 0; i < columns; i++) {
        drop[i] = 1;
      }
      function drawMatrix() {
        context.fillStyle = "rgba(0, 0, 0, 0.1)";
        context.fillRect(0, 0, matrix.width, matrix.height);
        context.fillStyle = "green";
        context.font = font_size + "px";
        for (var i = 0; i < columns; i++) {
          context.fillText(
            Math.floor(Math.random() * 2),
            i * font_size,
            drop[i] * font_size
          ); /*get 0 and 1*/
          if (
            drop[i] * font_size > (matrix.height * 2) / 3 &&
            Math.random() > 0.85
          )
            /*reset*/
            drop[i] = 0;
          drop[i]++;
        }
      }
      setInterval(drawMatrix, 50); //按照指定间隔一直执行方法
    },
    // Controller
    Controller(name, index, id) {
      switch (name) {
        case "inter":
          document.onkeydown = (e) => {
            if (e.keyCode == 13) {
              this.userLogin();
            }
          };
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.codeRain();
    this.Controller("inter");
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:rgba(255,255,255,1)");
  },
};
</script>
<style lang="less" scoped>
//code-protect-screen
.code-screen {
  .code-number {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .code-password {
    position: fixed;
    z-index: 1100;
    top: 40%;
    left: 45%;
    display: flex;
    flex-direction: column;
    .code-box {
      height: 60px;
    }
    input {
      width: 10vw;
      color: green;
      border: 2px solid green;
      background-color: #000000;
      outline-style: none;
      text-align: center;
    }
    input:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
    }
    div {
      font-size: 20px;
      color: red;
      margin-top: 5px;
      animation: 500ms;
      -webkit-animation: error 500ms;
      @keyframes error {
        from {
          opacity: 0.1;
        }
        to {
          opacity: 1;
        }
      }
      span {
        text-shadow: 0 0 8px rgba(255, 0, 0, 0.6),
          -0 -0 8px rgba(255, 0, 0, 0.6);
      }
    }
  }
  .code-btn{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    button{
      width: 5vw;
      color: green;
      border: 2px solid green;
      background-color: #000000;
      outline-style: none;
      text-align: center;
    }
    button:hover{
      box-shadow:  0 0 4px 4px rgba(0,255,74,0.2);
      color: rgba(0,255,74,0.6);
    }
  }
}
</style>
