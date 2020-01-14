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
  />
  </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->

      <search-result v-if="isRueultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
      <van-cell title="单元格" icon=search />
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
export default {
  data () {
    return {
      searchText: '',
      isRueultShow: false
    }
  },
  components: {
    SearchResult
  },
  methods: {
    onSearch () {
      console.log(this.searchText)
      this.isRueultShow = true
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
