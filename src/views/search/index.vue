<template>
  <div class="search-container">
    <!-- 搜索栏 -->
  <form action="/">
  <van-search
    v-model="searchText"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="$router.back()"
  />
  </form>
    <!-- /搜索栏 -->

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <van-cell-group>
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

    <!-- 搜索结果 -->
      <search-result />
    <!-- /搜索结果 -->
  </div>
</template>

<script>
import SearchResult from './components/search-result'
export default {
  data () {
    return {
      searchText: ''
    }
  },
  components: {
    SearchResult
  },
  methods: {
    onSearch () {
      console.log(this.searchText)
    },
    onCancel () {}
  }
}
</script>

<style>

</style>
