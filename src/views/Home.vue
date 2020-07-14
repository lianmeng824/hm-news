<template>
  <div class="home">
    <div class="header">
      <div class="log">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-sticky>
      <div class="manage" @click="$router.push('/guanli')">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-sticky>

    <van-tabs v-model="active" sticky swiper animated swipeable>
      <van-tab :title="item.name" v-for="item in TabList" :key="item.id">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- 上拉加载 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :mmediate-check="false"
          >
            <!--  要将home获取到的文章内容传给这个组件 用父传子的方法  这里传的是遍历的post -->
            <hm-post
              v-for="post in PostList"
              :key="post.id"
              :post="post"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.getTabList()
  },
  data() {
    return {
      active: 0,
      TabList: [],
      pageIndex: 1,
      pageSize: 5,
      PostList: [],
      finished: false,
      loading: false,
      refreshing: false // 如果为false 代表没有下拉  为ture 为正在下拉 当我们下拉的时候 回自动变成ture 下拉结束 就变为false
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
    async getPostList(id) {
      // 获取文章内容
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) {
          this.PostList = []
        }
        this.PostList.push(...data)
        this.loading = false // 当前list没有正在加载数据
        this.refreshing = false // 获取数据成功后 结束下拉
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      const id = this.TabList[this.active].id //  当前栏目的id
      this.getPostList(id) // 调用方法 加载更多 把当前栏目的id传进去
    },
    onRefresh() {
      this.PostList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true // tab切换的时候，不需要触发load事件
      this.getPostList(this.TabList[this.active].id) // 重新发送请求加载文章数据
    }
  },
  watch: {
    // 只要active发生变化 就重新发送请求 获取对应的栏目文章内容
    active(value) {
      // 只要栏目发送变化 就让之前栏目文章内容的数据都清空 如果不清空 会报错 因为当你切换页面的时候 前一个页面的数据也会在当前切换的页面里 会有问题
      this.PostList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true // 栏目切换的时候不需要触发load 防止load事件重复的触发
      this.getPostList(this.TabList[value].id) // 栏目发生改变，重新发送请求加载文章数据
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
/deep/.van-tabs .van-sticky {
  width: 90%;
}
.manage {
  position: absolute;
  right: 0;
  width: 10%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  z-index: 999;
}
</style>
