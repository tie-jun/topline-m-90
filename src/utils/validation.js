/**
 * 封装 validation 工具模块
 */
import Vue from 'vue'

// 加载需要使用的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
// 官方文档：https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示消息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 添加自定义规则
// 手机号
extend('mobileA', {
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  message: '{_field_}码格式错误'
})

// 验证码
extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
