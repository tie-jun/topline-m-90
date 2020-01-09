
/**
* 封装 vant 工具模块
*/

import Vue from 'vue'
// 加载
import {
  Button,
  Field,
  Tab, Tabs,
  NavBar,
  CellGroup,
  Toast,
  CountDown
} from 'vant'
// 注册
Vue.use(Button)
  .use(Field)
  .use(Tab).use(Tabs)
  .use(NavBar)
  .use(CellGroup)
  .use(Toast)
  .use(CountDown)
