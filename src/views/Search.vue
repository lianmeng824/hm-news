<template>
  <div class="search">
    <div class="title">
      <div class="left">
        <span class="iconfont iconjiantou2" @click="back"></span>
      </div>
      <div class="center">
        <input
          v-model="key"
          @input="input"
          @keyup.enter="search"
          type="text"
          placeholder="请输入搜索的文字"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <!-- 搜索推荐列表  如果推荐有就显示推荐的-->
    <div class="tuijian" v-if="tuijian.length > 0">
      <div
        class="item one-txt-cut"
        v-for="item in tuijian"
        :key="item.id"
        @click="tuijian_search(item)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- 显示的搜索内容 -->
    <div class="list" v-else-if="this.list.length > 0">
      <hm-post v-for="post in list" :key="post.id" :post="post"></hm-post>
    </div>

    <!-- 历史记录 -->
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div
            class="item one-txt-cut"
            @click="history_search(item)"
            v-for="item in history"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="history">
        <h3>热门搜索</h3>
        <div class="list">
          <div
            class="item"
            @click="history_search(item)"
            v-for="item in hot"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash' // 导入lodash 用于防抖函数
export default {
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  data() {
    return {
      key: '',
      list: [],
      history: [],
      hot: ['情火', '姑娘', '华为'],
      tuijian: []
    }
  },
  methods: {
    // 使用了防抖函数 获取推荐数据
    input: _.debounce(async function() {
      if (!this.key) {
        return
      }
      const res = await this.$axios.get(
        `/post_search_recommend?keyword=${this.key}`
      )
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tuijian = data
      }
    }, 1000),
    async search() {
      this.tuijian = []
      this.history = this.history.filter(item => item !== this.key) // 把重复的历史记录去掉
      this.history.unshift(this.key) // 把搜索的关键字存到历史记录
      localStorage.setItem('history', JSON.stringify(this.history)) // 把历史记录存到本地存储

      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    back() {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    history_search(item) {
      this.key = item
      this.search()
    },
    tuijian_search(item) {
      this.tuijian = []
      this.key = item.title
      this.search()
    }
  },
  watch: {
    // 监听 如果key为空 让list=[]或者list的长度=0  （如果内容为空，不显示文章列表，显示推荐的信息）
    key(value) {
      if (!value) {
        this.list = []
        this.tuijian = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .left {
      margin-right: 10px;
    }
    .center {
      flex: 1;
      width: 258px;
      position: relative;
      margin-top: -2px;
      input {
        width: 100%;
        height: 30px;
        border-radius: 15px;
        border: none;
        border: 1px solid #ccc;
        font-size: 14px;
        padding-left: 30px;
      }
      span {
        position: absolute;
        top: 17px;
        left: 10px;
      }
    }
    .right {
      margin-left: 10px;
      font-size: 16px;
      line-height: 50px;
    }
  }
  .content {
    .history {
      margin: 25px 10px;
      h3 {
        font-size: 20px;
      }
      .list {
        overflow: hidden;
        .item {
          float: left;
          margin-top: 10px;
          margin-left: 10px;
          font-size: 18px;
          width: 75px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          background-color: #ddd;
          border: 1px solid #ccc;
        }
      }
    }
  }
  .tuijian {
    .item {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      font-size: 18px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
