<template>
    <div>
        <div class="background">
            <img :src="imgSrc" alt="" width="100%" height="100%" >
        </div>
        <div class="loginBox">
            <div class="header">
                <h1 class="zh">xxx账号注册</h1>
            </div>
            <div class="main">
                <mt-field style="background:transparent;padding-bottom:10px;" type="text" label="用户名" placeholder="请输入用户名" :state="usernameState" v-model="username" @blur.native.capture="checkUsername"></mt-field>
                <mt-field style="background:transparent;padding-bottom:10px" type="text" label="手机号码" placeholder="请输入手机号" :state="phoneState" v-model="phone" @blur.native.capture="checkPhone"></mt-field>
                <mt-field style="background:transparent;padding-bottom:10px" type="text" label="短信验证码" placeholder="请输入短信验证码" :state="messageState" v-model="message" @blur.native.capture="checkMessage"><mt-button class="bu"   size="small" ><router-link class="hq" to="" @click="sendCode">获取验证码</router-link></mt-button></mt-field>
                <mt-field style="background:transparent;padding-bottom:10px" type="password" label="密码" placeholder="请输入密码" v-model="pwd" :state="pwdState" @blur.native.capture="checkPwd"></mt-field>
                <mt-field style="background:transparent;padding-bottom:10px" type="password" label="重复密码" placeholder="请再次输入密码" v-model="repwd" :state="repwdState" @blur.native.capture="checkRepwd"></mt-field>
                <mt-button class="zc" style="margin:0 auto;width:200px"   type="primary" size="large" @click="checkForm">免费注册</mt-button>
                <router-link to="/login" class="changeBtn">已有账号，去登录</router-link>
            </div>
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
            repwd:"",
            repwdState:"",
            phone:"",
            message:"",
            phoneState:"",
            messageState:"",
            imgSrc:require('../assets/webp.webp')


        }
    },
    methods:{
        
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
        checkRepwd(){
            let reg=/^\w{6}$/;
            if(reg.test(this.repwd) && (this.pwd==this.repwd)){
                this.repwdState='success';
                return true;
            }else{
                this.repwdState='error';
                return false;
            }
        },
        //发送验证码
        async sendCode(){
            if(!/^1\d{10}$/.test(this.phone)){
                this.$messagebox('提示信息','请保证手机号码正确');
                return;
            }
            //验证手机号是否被注册
            let data=await this.$api.personal.phone(this.phone);
            if(parseInt(data.code)===0){
               this.$messagebox('提示信息','手机号已经被注册，请选择登录或者忘记密码～'); 
               return;

            }
            //通知服务器发送验证码
            data=await this.$api.personal.code(this.phone);
            if(parseInt(data.code)===1){
                this.$messagebox('提示信息','当前服务器繁忙，请稍后再试'); 
               return;
            }

        },
        
        
        
        checkForm(){
            if(this.checkUsername()&&this.checkPwd()&&this.checkRepwd()){
                let url='/register'
                let param=`username=${this.username}&password=${this.pwd}`;
                this.axios.post(url,param).then(result=>{
                    console.log(result);
                    if(result.data.code==200){
                        this.$toast({
                            message:'注册成功',
                            position:'bottom',
                            duration:2000
                        })
                        this.$router.push('/login');
                    }else{
                        this.$messagebox('提示信息','用户已经存在')
                    }
                })
            }else{

            }

        }
        
    }
}
</script>
<style>
    .background{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
    }
    .loginBox{
        padding-top: 100px;
    }
    .main{
        background: transparent;
        color: white;
        
    }
    .zh{
        font-size: 30px;
        color:white;
        padding-bottom:10px
    }
    .mint-field-core{
        
        background: transparent;
        opacity: 0.8;
        
    }
    input::placeholder{
    color:white !important;
    }
    .changeBtn{
        color:white;
       
    }
    .bu{
        background-color: white !important;
        opacity: 0.6;
        
    }
    .zc{
        margin-bottom: 20px !important;
    }
    .hq{
        color: black;
    }
</style>