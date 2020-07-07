<template>
  <div class="mycomment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <!--
        上拉加载更多的列表组件
        finished-text: 没有更多数据的提示
        finished： 是一个布尔值，指定是否还有更多数据  默认为false 一旦为true 不会触发load事件 一旦没有数据了 要将其设置为true
        loading: 是一个布尔值， 指定当前list是否正在加载数据  默认是false load事件会触发 如果是true load事件不会触发  最后加载完数据要将loading改为false
        load事件： 当页面滚动条滚动到底部，就会触发load事件 就会加载数据 在初始化的时候就会触发一次 但是可以通过 immediate-check关闭（因为我们在初始化的时候就调用函数拿到了5条数据，所以不需要再拿一次数据）
        :immediate-check="false": 页面一加载，不触发load事件
        offset  设置距离底部多少距离就触发load事件 默认300
        onLoad事件：让页码值++ 发送请求
        -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="10"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <p>{{ item.create_date | time('YYYY-MM-DD HH:mm') }}</p>
          <div class="parent" v-if="item.parent">
            <p>回复：{{ item.parent.user.nickname }}</p>
            <p>{{ item.parent.content }}</p>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="link">
            <span class="one-txt-cut">{{ item.post.title }}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getList()
  },
  data() {
    return {
      list: [],
      pageIndex: 1, // 第几页
      pageSize: 5, // 一页几条
      loading: false, // 指定list是否在加载数据
      finished: false // 是否全部数据都加载完了
    }
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('user_comments', {
        params: {
          // 传数据
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      //   console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data] // 解构 展开运算符
        this.loading = false // 让他等于false onLoad才能再被触发
        if (data.length < this.pageSize) { // 加载的条数小于页面的条数 就是数据不够了 让“没有更多”显示
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    font-size: 16px;
    border-bottom: 1px solid #999;
    padding: 10px;
    p {
      color: #999;
      line-height: 40px;
    }
    .parent {
      background-color: #ddd;
      padding: 10px;
    }
    .content {
      padding: 20px 0;
    }
    .link {
      color: #999;
      display: flex;
      justify-content: space-between;
      span:first-child {
        width: 80%;
      }
    }
  }
}
</style>
