<template>
    <div class="tabbar-container">
        <!-- 子路由容器 -->
        <router-view></router-view>
        <!-- 子路由容器 -->

      <!-- tab-bar 标签栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="qa">问答</van-tabbar-item>
      <van-tabbar-item
      icon="manager-o"
      to="my"
      >{{ $store.state.user ? '我的' : '未登录' }}</van-tabbar-item>
    </van-tabbar>
      <!-- tab-bar 标签栏 -->
    </div>
</template>

<script>
export default {
  name: 'tabber'
}
</script>

<style>

</style>
