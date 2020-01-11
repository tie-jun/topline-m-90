import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storege'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放null或者一个对象  登录成功把后端数据存到这里
    user: getItem('user')
    // user: JSON.parse(window.localStorage.setItem('user'))
  },
  // 登陆成功调用
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止数据刷新丢失，这里还需要把数据放到本地存储
      setItem('user', state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
