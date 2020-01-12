<template>
  <div class="article-list">
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <!-- 文章列表 -->
  <van-list
    :v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
>
    <van-cell
    v-for="(item,index) in list"
    :key="index"
    :title="item.title"
    />
  </van-list>
  <!--文章列表 -->
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getArticle({
        // 1. 请求获取数据
        channel_id: this.channel.id,
        // 第1次使用 Date.now() 获取最新数据
        // 下一页的数据使用本次返回的数据中的 timestamp
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // 2. 把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)
      // 3. 加载状态结束
      this.loading = false

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // },
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
