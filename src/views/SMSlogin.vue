<template>
  <div id="login">
    <div class="backgl">
      <img :src="imgSrc" alt="" class="bgimg" />
    </div>
    <div class="loginBox">
      <div class="header">
        <div><img src="../assets/radiation.png" alt="" /></div>
        <h1 class="log">短信</h1>
      </div>
      <div v-if="type == 2">
        <!-- 手机号 -->
        <mt-field
          style="background: transparent; padding-bottom: 10px; color: black"
          id="inp"
          type="text"
          label="手机号码"
          placeholder="请输入您的手机号"
          :state="phoneState"
          v-model="phone"
        ></mt-field>
        <!--  @blur.native.capture="checkPhone"  my-field里面的 -->
        <!-- 短信验证 -->
        <mt-field
          style="background: transparent; padding-bottom: 10px; color: black"
          id="inp"
          type="password"
          label="短信验证码"
          placeholder="请输入短信验证码"
          v-model="message"
          :state="messageState"
        >
          <!-- @blur.native.capture="checkMessage"  上面的 -->
          <!-- <mt-button class="btn1" size="small"
            ><router-link class="sendCode1" to="" @click="sendCode"
              >获取验证码</router-link
            ></mt-button
          > -->
          <mt-button
            class="btn1 sendCode1"
            size="small"
            @click.native="sendCode"
            >获取验证码</mt-button
          >
        </mt-field>
      </div>
      <!-- 用户名 -->
      <div v-if="type == 2">
        <!-- <mt-field style="background:transparent;padding-bottom:10px;color:black" id="inp" type="text" label="用户名" placeholder="请输入用户名" :state="usernameState" v-model="username" @blur.native.capture="checkUsername"></mt-field> -->
        <!-- 密码 -->
        <!-- <mt-field style="background:transparent;padding-bottom:10px;color:black" id="inp" type="password" label="密码" placeholder="请输入密码" v-model="pwd" :state="pwdState" @blur.native.capture="checkPwd"></mt-field> -->
      </div>
      <mt-button @click.native="checkSMS" class="dl" type="primary" size="large"
        >注册并登陆</mt-button
      >
      <div class="bottombar">
        <!-- <router-link to="" class="changeBtn1" style="color:black">用户密码登录</router-link> -->
        <router-link to="/login" class="changeBtn1" style="color: black"
          >用户名密码登录</router-link
        >
        <router-link to="/register" class="changezc" style="color: red"
          >立即注册</router-link
        >
      </div>
    </div>
  </div>
</template>
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
    // checkUsername(){
    //     let username=this.username;

    //     let reg=/^[\u4E00-\u9FA5 \w]{2,12}$/;
    //     if(reg.test(username)){
    //         this.usernameState='success';
    //         return true;
    //     }else{
    //         this.usernameState='error';
    //         return false;
    //     }
    // },
    // checkPwd(){
    //     let pwd=this.pwd;

    //     let reg=/^\w{6}$/;
    //     if(reg.test(pwd)){
    //         this.pwdState='success';
    //         return true;
    //     }else{
    //         this.pwdState='error';
    //         return false;
    //     }
    // },

    // checkForm(){
    //     if(this.checkUsername()&&this.checkPwd()){
    //         let url='/login'
    //         let param=`user_name=${this.username}&upwd=${this.pwd}`;
    //         this.axios.post(url,param).then(result=>{
    //             console.log(result);
    //             if(result.data.code==200){
    //                 this.$toast({
    //                     message:'登录成功',
    //                     position:'bottom',
    //                     duration:2000
    //                 })
    //                 let user = result.data.result;
    //                 this.$store.commit('updateLoginState',user);
    //                 //把用户信息存入sessionStorage,
    //                 sessionStorage.setItem('islogin', 1);
    //                 sessionStorage.setItem('user', JSON.stringify(user));
    //                 this.$router.push(history.go(-1));
    //             }else{
    //                 this.$messagebox('提示信息','账号密码输入错误')
    //             }
    //         })
    //     }else{

    //     }

    // },
    //发送验证码
    sendCode() {
      // let rul = 'https://sms.tencentcloudapi.com'
      // this.axios.post(url).then(result=>{

      // })
      console.log("sendCode...");
      let tel = `tel=${this.phone}`;
      this.axios.post("/checktelephone", tel).then((res) => {
        console.log(res);
      });
    },
    //验证手机验证码
    checkSMS() {
      let SMS = `SMS=${this.message}`;
      this.axios.post("/checkSMS", SMS).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          // this.$toast({
          //   message:'登陆成功',
          //   position:'center',
          //   duration:1000
          // })
          //注册成功，存入资料，已注册，默认不修改。
          let url = "/register";
          let param = `user_name=${this.phone}&pwd=${this.message}`;
          this.axios.post(url, param).then((result) => {
            console.log(result);
            if (result.data.code == 200) {
              this.$toast({
                message: "注册并登陆成功",
                position: "bottom",
                duration: 2000,
              });
              //把用户信息存入sessionStorage,
              let user = this.phone;
              console.log(this.phone);
              this.$store.commit("updateLoginState", user);
              sessionStorage.setItem("islogin", 1);
              sessionStorage.setItem("user", JSON.stringify(user));
              //因为短信登陆需要跳转2次
              this.$router.push(history.go(-2));
            } else {
              this.$toast({
                message: "登陆成功",
                position: "bottom",
                duration: 2000,
              });
              //把用户信息存入sessionStorage,
              let user = this.phone;
              console.log(this.phone);
              this.$store.commit("updateLoginState", user);
              sessionStorage.setItem("islogin", 1);
              sessionStorage.setItem("user", JSON.stringify(user));
              //因为短信登陆需要跳转2次

              this.$router.push(history.go(-2));
            }
          });

          //把用户信息存入sessionStorage,
          let user = this.phone;
          console.log(this.phone);
          this.$store.commit("updateLoginState", user);
          sessionStorage.setItem("islogin", 1);
          sessionStorage.setItem("user", JSON.stringify(user));
        } else {
          this.$toast({
            message: "验证失败,请检查您的校验码",
            position: "center",
            duration: 3000,
          });
        }
      });
    },
  },
};
</script>
<style >
.header > div {
  width: 110px;
  height: 110px;
  margin: 10px auto;
  opacity: 0.3;
}
.header > div > img {
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
}
.log {
  padding-top: 20px;
  font-size: 30px;
  color: black;
  padding-bottom: 50px;
}
.loginBox {
  z-index: 1;
}
.btn1 {
  opacity: 0.6;
}
.dl {
  margin-bottom: 20px !important;
  margin: 0 auto;
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