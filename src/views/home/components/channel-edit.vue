<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
      size="mini"
      round
      type="danger"
      plain
       @click="isEditShow = !isEditShow"
>{{ isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value,index) in userChannels"
        :key="value.id"
        :text="value.name"
        @click="onUserChannelClick(index)"
      >
      <van-icon
     v-show="isEditShow && index !== 0"
      slot="icon"
      name="close" />
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
    <van-grid-item
    v-for="(item,index) in remainingChannels"
    :key="index"
    :text="item.name"
    @click="onChannelAdd(item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channels'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道: [],
      isEditShow: false
    }
  },
  computed: {
    //   计算剩余的推荐频道  思路：剩余频道 = 所有频道 - 我的频道
    remainingChannels () {
      const { allChannels, userChannels } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
      // 如果我的频道中不包含当前被遍历的频道，则要
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    //   获取所有频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，则执行删除操作
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1) // 从索引处开始，删除指定的个数
      } else {
        // 如果是非编辑状态，则切换频道
        this.$emit('input', index) // 修改激活的标签
        this.$emit('close') // 关闭弹层
      }
    },
    onChannelAdd (channel) {
      // 将点击的频道项添加到我的频道列表中
      this.userChannels.push(channel)

      // 不需要删除，我的频道改变，计算属性 recommendChannels 重新调用求值
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 40px 0;
    /deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -14px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }
}
}

</style>
