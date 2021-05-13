<template>
    <div id="register">
        <div class="backgr">
            <img :src="imgSrc" alt="" class="bgimg">
        </div>
        <div class="regBox">
            <div class="header">
               <div><img src="../assets/radiation.png" alt=""></div>
            </div>
            <div class="main">
                <mt-field 
                    style="background:transparent;
                    padding-bottom:6px;
                    color: black" 
                    type="text" 
                    label="用户名" 
                    placeholder="请输入用户名" 
                    :state="usernameState" 
                    v-model="username" @blur.native.capture="checkUsername">
                </mt-field>
                <mt-field 
                    style="background:transparent;
                    padding-bottom:6px;
                    color: black" 
                    type="text" 
                    label="手机号码"
                    placeholder="请输入手机号"  
                    v-model="phone" >
                </mt-field>
                <!-- <mt-field 
                style="background:transparent;
                padding-bottom:6px;
                color: black" 
                type="text" 
                label="短信验证码" 
                placeholder="请输入短信验证码"  
                v-model="message" >
                <mt-button class="btn"   size="small" ><router-link class="sendCode" to="" >获取验证码</router-link></mt-button>
                </mt-field> -->
                <mt-field 
                    style="background:transparent;
                    padding-bottom:6px;color: black" 
                    type="password" label="密码" 
                    placeholder="请输入密码" v-model="pwd" 
                    :state="pwdState" @blur.native.capture="checkPwd">
                </mt-field>
                <mt-field 
                    style="background:transparent;
                    padding-bottom:6px;color: black" 
                    type="password" label="重复密码" 
                    placeholder="请再次输入密码" 
                    v-model="repwd" 
                    :state="repwdState" @blur.native.capture="checkRepwd">
                </mt-field>
                <mt-button  
                    style="margin:0 auto;width:200px;margin-bottom: 30px" 
                    type="primary" size="large" @click="checkForm">免费注册
                </mt-button>
                <div
                style="text-align:center"><router-link to="/login" class="changeBtn" style="width:100%">已有账号，去登录</router-link></div>
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
            
            imgSrc:require('../assets/login.png'),
            //倒计时
            isRun:false,
            runTime:30

        };
    },
    methods:{
        
        checkUsername(){
            let username=this.username;
            
            let reg=/^[\u4E00-\u9FA5 \w]{2,12}$/;
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
        // async sendCode(){
        //     if(!/^1\d{10}$/.test(this.phone)){
        //         if(this.isRun)return;
        //         this.$messagebox('提示信息','请保证手机号码正确');
        //         return;
        //     }
        //     //验证手机号是否被注册
        //     let data=await this.$api.personal.phone(this.phone);
        //     if(parseInt(data.code)===0){
        //        this.$messagebox('提示信息','手机号已经被注册，请选择登录或者忘记密码～'); 
        //        return;

        //     }
            //通知服务器发送验证码
            // data=await this.$api.personal.code(this.phone);
            // if(parseInt(data.code)===1){
            //     this.$messagebox('提示信息','当前服务器繁忙，请稍后再试'); 
            //    return;
            // }
            //开启倒计时
        //     this.isRun=true;
        //     this.autoTimer=setInterval(()=>{
        //         if(this.runTime===0){
        //             this.runTime=30;
        //             this.isRun=false;
        //             clearInterval(this.autoTimer)
        //             return;
        //         }
        //         this.runTime--;

        //     },1000)

        // },
        
        
        
        checkForm(){
            if(this.checkUsername()&&this.checkPwd()&&this.checkRepwd()){
                let url='/register'
                let param=`user_name=${this.username}&pwd=${this.pwd}`;
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
<style >
     .header{
        margin-top:50px;
    }
    .header>div{
        width: 110px;
        height: 110px;
        margin: 10px auto;
        opacity: 0.3;
    }
    .header>div>img{
        margin-top: 50px;
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        border-radius: 50%;
        box-shadow: 0 0 10px 5px rgb(76, 74, 74);
    }
    .backgr{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
    }
    .bgimg{
        width: 100%;
        height: 100%;
        opacity: 0.2;
        position: fixed;
    }
   .regBox .main{
        padding-top: 135px;
        color:black;
        padding-bottom:30px;
    }
    .regBox{
        z-index: 1;
    }
    .btn1{
        opacity: 0.6;
        
    }
    #loginbtn.dl{
        margin-bottom: 50px !important;
        margin:0 auto;width:200px !important;
    }
    .changezc{
        color:white;
        margin-left: 20px;
    }
    .changeBtn{
        color: red;

    }
    /* input::placeholder{
    color:black !important;
    } */

    input{background: transparent !important;}
    .sendCode1{
        color: black;
    }
    .bottombar{
        display: flex;
        justify-content: space-around;
    }
</style>