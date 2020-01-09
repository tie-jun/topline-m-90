<template>
  <div class="login">
    <!-- 登录头 -->
  <van-nav-bar title="登录页面"/>
    <!-- 登录头 -->

    <!-- 手机号和密码 -->
    <ValidationObserver>
    <!-- 手机号 -->
      <ValidationProvider name="手机号" rules="required">
          <van-field
          v-model="user.mobile"
          clearable label="手机号"
          placeholder="请输入手机号"/>
      </ValidationProvider>
    <!-- 手机号 -->
    <!-- 验证码 -->
      <ValidationProvider name="验证码" rules="required | length：11" v-slot="{ errors }">

          <van-field label="密码"
          v-model="user.code"
          placeholder="请输入验证码" required>

        <van-count-down
          v-if="isCountDownShow"
          slot="button" :time="1000*60"
          format=" ss s"
          @finish="isCountDownShow = false"/>

        <van-button slot="button"
          v-else size="small"
          type="primary"
          round
          @click="onSmsCode">发送验证码</van-button>
        </van-field>

      </ValidationProvider>
    <!-- 验证码 -->
    </ValidationObserver>
    <!--  手机号和密码 -->

    <!-- 登录按钮 -->
    <div class="loginButton">
      <van-button type="info"
        @click="onLogin"
        class="Button">登录</van-button>
    </div>
    <!-- 登录按钮 -->
  </div>
</template>

<script>

import { login, getSmsCode } from '@/api/user'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false
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
        const result = await login(user)
        console.log(result)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败')
        this.$toast.fail('登录失败')
      }
      // 4.根据接口返回结果执行后续业务处理
    },

    async onSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.校验手机号
      // 3.发送验证码
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发送
        await getSmsCode(mobile)
      } catch (err) {
        // 发送失败
        console.log(err)
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        // 频繁提示
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
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
