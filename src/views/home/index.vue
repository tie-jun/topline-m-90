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
<channel-edit    :user-channels="userChannels"
   v-model="active"
  @close="isChannelEditShow = false"
  />
</van-popup>
  <!-- 频道编辑 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem, setItem } from '@/utils/storege'
export default {
  data () {
    return {
      active: 0,
      userChannels: [], // 用户频道列表
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },

  methods: {
    async loadUserChannels () {
      // 1. 定义一个变量用来存储频道列表
      let channels = []

      // 2. 获取本地存储的频道列表
      const localUserChannles = getItem('user-channels')

      // 3. 如果本地存储有，就使用本地存储的
      if (localUserChannles) {
        channels = localUserChannles
      } else {
        // 4. 如果本地存储没有，则请求获取接口推荐的频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      }

      // 5. 最后，把数据赋值到当前组件中
      this.userChannels = channels
    }
  },
  watch: {
    // 当 userChannels 发生改变的时候，将该数据存储到本地存储
    userChannels () {
      setItem('user-channels', this.userChannels)
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
