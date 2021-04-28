import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem('islogin')? 1:0,     // 默认未登录状态
    user: sessionStorage.getItem('user')?
    JSON.parse(sessionStorage.getItem('user')) : null      // 保存当前用户对象
  },
  mutations: {
    // 当前方法将会在调用 $store.commit('updateLoginState')
    // 时自动执行，这个操作是vuex来实现的，并且vuex在调用
    // 该方法时会自动注入state对象方便我们访问state中的数据
    updateLoginState(state, user) {
      state.islogin = 1;
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
