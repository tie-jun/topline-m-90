<template>
  <div class="home-container">
  <!-- 导航栏 -->
  <van-nav-bar title="首页" fixed/>
  <!-- 导航栏 -->

  <!-- 频道列表 -->
  <van-tabs v-model="active">
     <van-icon
      class="wap-nav"
      slot="nav-right"
      name="wap-nav"
      @click="isChannelEditShow = true"
     />
     <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
       <article-list :channel="channel"/>
    </van-tab>
  </van-tabs>
  <!-- 频道列表 -->

  <!-- 频道编辑 -->
  <van-popup
  v-model="isChannelEditShow"
  position="bottom"
   closeable
  close-icon-position="top-left"
  :style="{ height: '100%' }"
>
<channel-edit    :user-channels="userChannels" />
</van-popup>
  <!-- 频道编辑 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  data () {
    return {
      active: 0,
      userChannels: [], // 用户频道列表
      isChannelEditShow: true
    }
  },
  components: {
    ArticleList,
    ChannelEdit
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

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
}
}
</style>
