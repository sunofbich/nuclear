import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem('islogin')? 1:0,     // Ĭ��δ��¼״̬
    user: sessionStorage.getItem('user')?
    JSON.parse(sessionStorage.getItem('user')) : null      // ���浱ǰ�û�����
  },
  mutations: {
    // ��ǰ���������ڵ��� $store.commit('updateLoginState')
    // ʱ�Զ�ִ�У����������vuex��ʵ�ֵģ�����vuex�ڵ���
    // �÷���ʱ���Զ�ע��state���󷽱����Ƿ���state�е�����
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
