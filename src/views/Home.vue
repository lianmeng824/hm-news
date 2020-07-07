<template>
  <div class="home">
      <div class="header">
        <div class="log">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="search">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
        <div class="user">
          <span class="iconfont iconwode"></span>
        </div>

      </div>
      <van-tabs v-model="active" sticky swiper animated>
        <van-tab :title="item.name" v-for="item in TabList" :key="item.id">
          <!--  要将home获取到的文章内容传给这个组件 用父传子的方法  这里传的是遍历的post -->
          <hm-post v-for="post in PostList" :key="post.id" :post="post"></hm-post>
        </van-tab>

      </van-tabs>
  </div>
</template>

<script>
export default {
  created() {
    this.getTabList()
  },
  data() {
    return {
      active: 0,
      TabList: [],
      pageIndex: 1,
      pageSize: 5,
      PostList: []
    }
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.TabList = data
        this.getPostList(this.TabList[0].id) // 获取到栏目数据之后 需要渲染第一个栏目的文章
      }
    },
    async getPostList(id) { // 获取文章内容
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.PostList = data
      }
    }

  },
  watch: { // 只要active发生变化 就重新发送请求 获取对应的栏目文章内容
    active(value) {
      this.getPostList(value)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  background-color: #ff0000;
  height: 54px;
  color: #fff;
  align-items: center;
  padding: 10px;
  .search {
    flex: 1;
    height: 34px;
    font-size: 14px;
    background: rgba(225, 225, 225, 0.5);
    border-radius: 17px;
    margin: 0 20px;
    text-align: center;
    line-height: 34px;
    span {
      margin-right: 5px;
    }

  }
  .log,
  .user {
    width: 50px;
  }
  .log {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
}
</style>
