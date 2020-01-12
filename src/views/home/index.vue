<template>
  <div class="home-container">
  <!-- 导航栏 -->
  <van-nav-bar title="首页"/>
  <!-- 导航栏 -->

  <!-- 频道列表 -->
  <van-tabs v-model="active">
     <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
       <article-list :channel="channel"/>
    </van-tab>
  </van-tabs>
  <!-- 频道列表 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  data () {
    return {
      active: 0,
      userChannels: [] // 用户频道列表
    }
  },
  components: {
    ArticleList
  },

  methods: {
    // 获取频道列表数据
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style>

</style>
