<template>
  <div class="search-container">
    <!-- 搜索栏 -->
  <form class="search-form" action="/">
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch(searchText)"
    @cancel="$router.back()"
    @focus="isRueultShow = false"
    @input="onSearchInput"
  />
  </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->

      <search-result v-if="isRueultShow" :q="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
      icon=search
      v-for="(item,index) in Suggestions"
      :key="index"
      @click="onSearch(item)"
      >
      <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
         <span @click="searchHistories = []">全部删除</span>
        &nbsp;&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isDeleteShow = true"></van-icon>
      </van-cell>
      <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onSearch(item)"
      >
        <van-icon
        name="close"
        v-show="isDeleteShow"
        @click="searchHistories.splice(index,1)"
        ></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/serach'
import { getItem, setItem } from '@/utils/storege'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      searchText: '',
      isRueultShow: false,
      Suggestions: [], // 联想建议
      searchHistories: getItem('search-histories') || [], // 收集搜索历史记录
      isDeleteShow: false
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-histories', newVal)
    }
  },
  components: {
    SearchResult
  },
  methods: {
    onSearch (q) {
      // 1.修改文本框内容
      this.searchText = q
      // 2.记录历史搜索记录
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
      // 3.展示搜索结果
      this.isRueultShow = true
    },

    onSearchInput: debounce(async function () {
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      this.Suggestions = data.data.options
    }, 500),

    // async onSearchInput () {
    //   const searchText = this.searchText
    //   if (!searchText) {
    //     return
    //   }
    //   const { data } = await getSuggestions(searchText)
    //   this.Suggestions = data.data.options
    // },

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
