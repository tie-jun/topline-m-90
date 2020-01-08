<template>
  <div class="login">
    <!-- 登录头 -->
  <van-nav-bar title="登录页面"/>
    <!-- 登录头 -->

    <!-- 手机号和密码 -->
    <van-cell-group>
  <van-field required  v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号"/>
  <van-field label="密码" v-model="user.code" placeholder="请输入密码" required>
    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
  </van-field>
    </van-cell-group>
    <!--  手机号和密码 -->

    <!-- 登录按钮 -->
    <div class="loginButton">
      <van-button type="info" @click="onLogin" class="Button">登录</van-button>
    </div>
  </div>
</template>

<script>

import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async  onLogin () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 3.请求提交
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败')
        this.$toast.fail('登录失败')
      }
      // 4.根据接口返回结果执行后续业务处理
    }
  }
}
</script>

<style lang='less' scoped>
.loginButton{
  padding: 20px 30px;
  width: 315px;
  .Button{
    width: 100%;
  }
}
</style>
