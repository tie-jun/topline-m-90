<template>
  <div class="login">
    <!-- 登录头 -->
  <van-nav-bar title="登录页面"/>
    <!-- 登录头 -->

    <!-- 手机号和密码 -->
    <van-cell-group>
  <van-field required  v-model="user.mmobile" clearable label="手机号" placeholder="请输入手机号"/>
  <van-field label="密码" v-model="user.code" placeholder="请输入密码" required/>
    </van-cell-group>
    <!--  手机号和密码 -->

    <!-- 登录按钮 -->
    <div class="loginButton">
      <van-button type="info" class="Button">登录</van-button>
    </div>
  </div>
</template>

<script>
import '@/utils/register-vant'
import '@/styles/base.less'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
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
