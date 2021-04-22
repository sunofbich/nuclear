<template>
    <div id="login">
        <div class="backgl">
            <img :src="imgSrc" alt="" width="100%" height="100%">
        </div>
        <div class="loginBox">
            <div class="header">
                <h1 class="log" style="margin: 0 auto;">欢迎登录xxx</h1>
            </div>
            <div v-if="type===1">
            <mt-field style="background:transparent;padding-bottom:10px;color:white" id="inp" type="text" label="手机号码" placeholder="请输入您的手机号" :state="phoneState" v-model="phone" ></mt-field>
            <mt-field style="background:transparent;padding-bottom:10px;color:white" id="inp" type="password" label="短信验证码" placeholder="请输入短信验证码" v-model="message" :state="messageState" >
                <mt-button class="btn1"   size="small" ><router-link class="sendCode1" to="" @click="sendCode">获取验证码</router-link></mt-button>
            </mt-field>
            </div>
            <div v-if="type===2">
            <mt-field style="background:transparent;padding-bottom:10px;color:white" id="inp" type="text" label="用户名" placeholder="请输入用户名" :state="usernameState" v-model="username" @blur.native.capture="checkUsername"></mt-field>
            <mt-field style="background:transparent;padding-bottom:10px;color:white" id="inp" type="password" label="密码" placeholder="请输入密码" v-model="pwd" :state="pwdState" @blur.native.capture="checkPwd"></mt-field>
            </div>
            <mt-button class="dl" type="primary" size="large" @click="checkForm">快速登录</mt-button>
            <span  class="changeBtn1" @click="changeType" style="margin: 0 auto;">{{type===2 ?'短信验证码登录':'用户名密码登录'}}</span>
           
            <router-link to="/register" class="changezc" >立即注册</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:"",
            usernameState:"",
            pwd:"",
            pwdState:"",
            message: '',
            messageState: '',
            phone:"",
            phoneState:"",
            imgSrc:require('../assets/webp.webp'),
            type: 2
        }
    },
    methods:{
        //短信验证和用户名密码切换
        changeType(){
            this.type=this.type=== 2 ? 1 : 2;
        },

        checkUsername(){
            let username=this.username;
            
            let reg=/^\w{6,12}$/;
            if(reg.test(username)){
                this.usernameState='success';
                return true;
            }else{
                this.usernameState='error';
                return false;
            }
        },
        checkPwd(){
            let pwd=this.pwd;
            
            let reg=/^\w{6}$/;
            if(reg.test(pwd)){
                this.pwdState='success';
                return true;
            }else{
                this.pwdState='error';
                return false;
            }
        },
        
        checkForm(){
            if(this.checkUsername()&&this.checkPwd()){
                let url='/login'
                let param=`username=${this.username}&password=${this.pwd}`;
                this.axios.post(url,param).then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        this.$toast({
                            message:'登录成功',
                            position:'bottom',
                            duration:2000
                        })
                        let user = result.data.result;
                        this.$store.commit('updateLoginState',user);
                        //把用户信息存入sessionStorage,
                        sessionStorage.setItem('islogin', 1);
                        sessionStorage.setItem('user', JSON.stringify(user));
                        this.$router.push('/');
                    }else{
                        this.$messagebox('提示信息','账号密码输入错误')
                    }
                })
            }else{
                
            }

        },
        //发送验证码
        sendCode(){
            if(!/^1\d{10}$/.test(this.phone)){
                this.$messagebox('提示信息','请保证手机号码正确');
                return;
            }
        },
    }
}
</script>
<style >
    .backgl{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
    }
    .log{
        padding-top: 50px;
        font-size: 24px;
        color:white;
        padding-bottom:10px;
        
    }
    .loginBox{
        z-index: 1;
    }


    .btn1{
        opacity: 0.6;
        
    }
    .dl{
        margin-bottom: 20px !important;
        margin:0 auto;width:200px !important;
    }
    .changeBtn1{
        color:white;
       
    }
    .changezc{
        color:white;
        margin-left: 20px;
        
    }
    input::placeholder{
    color:white !important;
    
    }
    input{background: transparent !important;}
    .sendCode1{
        color: black;
    }
</style>