<template>
  <div class="search-container">
    <!-- 搜索栏 -->
  <form class="search-form" action="/">
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="$router.back()"
    @focus="isRueultShow = false"
    @input="onSearchInput"
  />
  </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->

      <search-result v-if="isRueultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
      icon=search
      v-for="(item,index) in Suggestions"
      :key="index"
      >
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录" icon=search >
        <van-icon name="delete"></van-icon>
        <span>全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span>完成</span>
      </van-cell>
      <van-cell title="历史记录" icon=search >
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="历史记录" icon=search >
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="历史记录" icon=search >
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="历史记录" icon=search >
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/serach'
export default {
  data () {
    return {
      searchText: '',
      isRueultShow: false,
      Suggestions: []// 联想建议
    }
  },
  components: {
    SearchResult
  },
  methods: {
    onSearch () {
      console.log(this.searchText)
      this.isRueultShow = true
    },

    async onSearchInput () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      console.log(data)
      this.Suggestions = data.data.options
    },

    highlight (str) {
      // /this.searchText/  注意：/这里的一切都是字符串/
    // 如果想要动态的创建一个正则表达式，使用 new RegExp 手动构造
    // 它会根据字符串创建一个正则表达式对象
    // 参数2：用来指定匹配模式，例如 g 全局，i 忽略大小写
    // /dsadsa/gi
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }

  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: black;
  }
}
</style>
