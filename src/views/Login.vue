<template>
  <div id="login">
    <div class="backgl">
      <img :src="imgSrc" alt="" class="bgimg" />
    </div>
    <div class="loginBox">
      <div class="header">
        <div><img src="../assets/radiation.png" alt="" /></div>
      </div>
      <!-- <div v-if="type==2"> -->
      <!-- 手机号 -->
      <!-- <mt-field style="background:transparent;padding-bottom:10px;color:black" id="inp" type="text" label="手机号码" placeholder="请输入您的手机号" :state="phoneState" v-model="phone" @blur.native.capture="checkPhone"></mt-field> -->
      <!-- 短信验证 -->
      <!-- <mt-field style="background:transparent;padding-bottom:10px;color:black" id="inp" type="password" label="短信验证码" placeholder="请输入短信验证码" v-model="message" :state="messageState" @blur.native.capture="checkMessage"> -->
      <!-- <mt-button class="btn1"   size="small" ><router-link class="sendCode1" to="" @click="sendCode">获取验证码</router-link></mt-button> -->
      <!-- </mt-field> -->
      <!-- </div> -->
      <!-- 用户名 -->
      <div v-if="type == 2" class="log">
        <mt-field
          style="background: transparent; padding-bottom: 10px; color: black"
          id="inp"
          type="text"
          label="用户名/手机"
          placeholder="请输入用户名"
          :state="usernameState"
          v-model="username"
          @blur.native.capture="checkUsername"
        ></mt-field>
        <!-- 密码 -->
        <mt-field
          style="background: transparent; padding-bottom: 10px; color: black"
          id="inp"
          type="password"
          label="密码"
          placeholder="请输入密码"
          v-model="pwd"
          :state="pwdState"
          @blur.native.capture="checkPwd"
        ></mt-field>
      </div>

      <!-- qq登陆按钮 -->
      <!-- <span id="login_btn_modal"><img src="qqbt.png" alt="" /></span> -->
      <a style="margin-left:50px" href="#" @click="toLogin"> <img src="qqbt.png" alt="" /></a>

      <!-- wb登陆按钮 -->
      <wb:login-button style="margin-left:90px" type="3,2" onlogin="login" onlogout="logout"
        >登录按钮</wb:login-button
      >
      <mt-button style="margin-top:15px"
        id="loginbtn"
        class="dl"
        type="primary"
        size="large"
        @click="checkForm"
        >快速登录</mt-button
      >
      <div class="bottombar">
        <!-- <router-link to="" class="changeBtn1" style="color:black">用户密码登录</router-link> -->
        <router-link to="/SMSLogin" class="changeBtn1" style="color: black"
          >短信验证码注册/登录</router-link
        >
        <router-link to="/register" class="changezc" style="color: red"
          >立即注册</router-link
        >
      </div>
    </div>
  </div>
</template>



    <script type="text/javascript"  charset="utf-8"
    src="http://connect.qq.com/qc_jssdk.js"
    data-appid="101946835"
    data-redirecturi="http://npfive.cn/login"
></script>


 <script type="text/javascript">
//qq互联
QC.Login({
  btnId: "qqLoginBtn", //插入按钮的节点id
});
</script>




<script>
export default {
  data() {
    return {
      username: "",
      usernameState: "",
      pwd: "",
      pwdState: "",
      message: "",
      messageState: "",
      phone: "",
      phoneState: "",
      imgSrc: require("../assets/login.png"),
      type: 2,
    };
  },
  methods: {
    checkUsername() {
      let username = this.username;

      let reg = /^[\u4E00-\u9FA5 \w]{2,12}$/;
      if (reg.test(username)) {
        this.usernameState = "success";
        return true;
      } else {
        this.usernameState = "error";
        return false;
      }
    },
    checkPwd() {
      let pwd = this.pwd;

      let reg = /^\w{6}$/;
      if (reg.test(pwd)) {
        this.pwdState = "success";
        return true;
      } else {
        this.pwdState = "error";
        return false;
      }
    },
    toLogin() {
      //以下为按钮点击事件的逻辑。注意这里要重新打开窗口
      //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
      var A = window.open(
        "oauth/index.php",
        "TencentLogin",
        "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1"
      );
    },

    //qq登陆
    //loginQQ() {},

    checkForm() {
      if (this.checkUsername() && this.checkPwd()) {
        let url = "/login";
        let param = `user_name=${this.username}&upwd=${this.pwd}`;
        console.log(param)
        this.axios.post(url, param).then((result) => {
          console.log(result);
          if (result.data.code == 200) {
            this.$toast({
              message: "登录成功",
              position: "center",
              duration: 1000,
            });
            let user = result.data.result;
            console.log(user)
            this.$store.commit("updateLoginState", user);
            //把用户信息存入sessionStorage,
            sessionStorage.setItem("islogin", 1);
            sessionStorage.setItem("user", JSON.stringify(user));
            this.$router.push(history.go(-1));
          } else {
            this.$messagebox("提示信息", "用户名或密码输入错误");
          }
        });
      } else {
        console.log('s哈也不是')
      }
    },
  },
};
</script>
<style >
.header {
  margin-top: 50px;
}
.header > div {
  width: 110px;
  height: 110px;
  margin: 10px auto;
  opacity: 0.3;
}
.header > div > img {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  border: 1px solid gray;
  border-radius: 50%;
  box-shadow: 0 0 10px 5px rgb(76, 74, 74);
}
.backgl {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: fixed;
}
.bgimg {
  width: 100%;
  height: 100%;
  opacity: 0.2;
  position: fixed;
}
.loginBox .log {
  padding-top: 135px;
  font-size: 30px;
  color: black;
  padding-bottom: 30px;
}
.loginBox {
  z-index: 1;
}
.btn1 {
  opacity: 0.6;
}
#loginbtn.dl {
  margin-bottom: 50px !important;
  margin: 5px auto;
  width: 200px !important;
}
.changeBtn1 {
  color: white;
}
.changezc {
  color: white;
  margin-left: 20px;
}
/* input::placeholder{
    color:black !important;
    } */

input {
  background: transparent !important;
}
.sendCode1 {
  color: black;
}
.bottombar {
  display: flex;
  justify-content: space-around;
}
</style>