import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载validate校验工具
import './utils/validation.js'

// 加载vant
import './utils/register-vant'

// 默认的HTML元素样式上提供了跨浏览器的高度一致性
import 'normalize.css'

// 配置 REM 适配
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
