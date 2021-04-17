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
Vue.use(MintUI)

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
