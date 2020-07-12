<template>
  <div class="hm-comment">
    <div class="title">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">{{ comment.user.nickname }}</div>
        <div class="time">{{ comment.create_date | fromNow }}</div>
      </div>
      <div class="right" @click="huifu(comment.user.nickname, comment.id)">
        回复
      </div>
    </div>
    <HmFloor
      :num="getFloor(0, comment)"
      v-if="comment.parent"
      :comment="comment.parent"
    ></HmFloor>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
import HmFloor from '../components/HmFloor'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    HmFloor
  },
  methods: {
    // 为了求楼层数
    getFloor(num, comment) {
      if (comment.parent) {
        return this.getFloor(num + 1, comment.parent) // 如果有comment.parent 就继续调用这个方法 让num+1 传的参数2也变成comment.parent  直到没有comment.parent了 就返回num
      } else {
        return num
      }
    },
    huifu(name, id) {
      //   console.log(name, id)
      //   this.$emit('huifu', name, id)
      this.$bus.$emit('huifu', name, id) // 有了bus就可以直接用bus了
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  border-top: 1px solid #ccc;
  padding-bottom: 10px;
  .title {
    padding: 20px;
    font-size: 16px;
    display: flex;
    .left {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .time {
        color: #999;
        padding-top: 5px;
      }
    }
    .right {
      color: #999;
    }
  }
  .content {
    font-size: 16px;
    padding: 0 20px;
  }
}
</style>
