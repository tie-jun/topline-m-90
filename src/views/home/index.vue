<template>
  <div class="home-container">
  <!-- 导航栏 -->
  <van-nav-bar title="首页"/>
  <!-- 导航栏 -->

  <!-- 频道列表 -->
  <van-tabs v-model="active">
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
       <!-- 文章列表 -->
  <van-list
    :v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
>
    <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
    />
  </van-list>
  <!-- 文章列表 -->
  </van-pull-refresh>

  <van-tab title="标签 1"></van-tab>
  <van-tab title="标签 2"></van-tab>
  <van-tab title="标签 3"></van-tab>
  <van-tab title="标签 4"></van-tab>
  </van-tabs>
  <!-- 频道列表 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }

}
</script>

<style>

</style>
