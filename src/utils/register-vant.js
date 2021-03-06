
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
  CountDown,
  Tabbar,
  TabbarItem,
  Image,
  Grid,
  GridItem,
  Icon,
  Cell,
  Dialog,
  List,
  PullRefresh,
  Popup,
  Search
} from 'vant'
// 注册
Vue.use(Button)
  .use(Field)
  .use(Tab).use(Tabs)
  .use(NavBar)
  .use(CellGroup)
  .use(Toast)
  .use(CountDown)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Image)
  .use(Grid)
  .use(Icon)
  .use(GridItem)
  .use(Cell)
  .use(Dialog)
  .use(List)
  .use(PullRefresh)
  .use(Popup)
  .use(Search)
