<template>
  <div>
    <!-- 这里是如果有comment.parent 才渲染 没有了就不渲染了 就不会死循环 同时把comment.parent的数据传过去 -->
    <hm-floor
      v-if="comment.parent"
      :comment="comment.parent"
      :num="num - 1"
    ></hm-floor>
    <div class="hm-floor">
      <div class="title">
        <div class="left">{{ num }}楼：{{ comment.user.nickname }}</div>
        <div class="center">{{ comment.create_date | fromNow }}</div>
        <div class="right" @click="huifu(comment.user.nickname, comment.id)">
          回复
        </div>
      </div>
      <div class="comment">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    num: Number
  },
  methods: {
    huifu(name, id) {
      this.$bus.$emit('huifu', name, id) // 触发bus事件
    }
  }
}
</script>

<style lang="less" scoped>
.hm-floor {
  border: 1px solid #000;
  margin: 0 10px;
  margin-top: -1px;
  .title {
    display: flex;
    font-size: 16px;
    padding: 10px;
    .center {
      flex: 1;
      color: #999;
      padding-left: 10px;
    }
    .left {
      padding-left: 5px;
    }
    .right {
      color: #999;
    }
  }
  .comment {
    font-size: 16px;
    padding: 10px;
  }
}
</style>
