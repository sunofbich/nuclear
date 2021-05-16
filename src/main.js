import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入moment.js  时间处理
import moment from 'moment'
Vue.prototype.$moment = moment

//引入mintUI 
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui';
// import  MessageBox  from 'mint-ui';
// import { MessageBox } from 'mint-ui';
Vue.use(MintUI)

// Vue.use(MessageBox)

// 引入axios
import axios from 'axios'
// axios.defaults.baseURL = 'http://82.157.103.228:3000'
//此处需要注释掉 下面
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.axios = axios


Vue.config.productionTip = false

//  //  //配置session 
//   //  app = require('express')
//   //  session = require('express-session')
//   app.use(session({
//     //session 签名
//   secret: 'SMSCode',
//   //session (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
//   resave:true,
//   //初始化session时是否保存到存储。
//   saveUninitialized:false,
//   //cookie://设置cookie的过期时间，例：80s后session和相应的cookie失效过期
//   cookie:{maxAge:60*1000}
//   }))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
