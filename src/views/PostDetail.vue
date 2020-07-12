<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <span v-if="post.has_follow" class="onfollow" @click="nofollow"
          >已关注</span
        >
        <span v-else class="follow" @click="follow">关注</span>
      </div>
    </div>
    <div class="content">
      <div class="titel">{{ post.title }}</div>
      <div class="user">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.create_date | time }}</span>
      </div>
      <!-- 文章里面的具体内容是有标签还有图片的  所以不能直接放在下面标签中 要用v-html 这样post.content里面的标签还有图片才会生效 -->
      <div v-if="post.type === 1" class="info" v-html="post.content"></div>
      <video v-else :src="post.content" controls loop poster></video>

      <div class="buts">
          <div class="dianzan" @click="dianzan" :class="{bianred:post.has_like}">
            <span class="iconfont icondianzan"></span>
            <span>{{post.like_length}}</span>
          </div>
          <div class="wx">
            <span class="iconfont iconweixin"></span>
            <span>微信</span>
          </div>
      </div>
    </div>
    <div class="pinglun">
      <h3>精彩跟帖</h3>
      <div class="list">
        <hm-comment @huifu="huifu" v-for="item in list" :key="item.id" :comment="item"></hm-comment>
      </div>

    </div>

    <footer>
      <!-- input框的样式 -->
      <div class="input" v-show="!isShowTextArea">
        <input type="text" placeholder="写跟帖" @focus="focus">
        <span class="iconfont iconpinglun-">
          <div class="tiaoshu">{{post.comment_length}}</div>
        </span>
        <span class="iconfont iconshoucang" @click="shoucang" :class="{redbian: post.has_star}"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <!-- textarea的样式 -->
      <div class="textarea" v-show="isShowTextArea"  >
        <textarea ref="textarea" :placeholder="'回复：'+ huifuName" @blur="blur" v-model="text"></textarea>
        <span @click="fasong">发送</span>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  async created() {
    this.getpost() // 在方法里封装好了的·
    this.getCommentList()
    // 给bus注册事件
    this.$bus.$on('huifu', (name, id) => {
      this.huifuName = name
      this.huifuId = id
      this.isShowTextArea = true
      this.$nextTick(() => { // 这里这样写是因为 无法用async 所以只能用.then和这样的回调函数写法
        this.$refs.textarea.focus()
      })
    })
  },
  data() {
    return {
      post: {
        user: {} // 如果不写会报错 说nickname找不到 这是因为一进页面就会请求数据 再数据没有回来之前 会先渲染html结构页面 渲染完之后 数据回来了 但是再那之前页面渲染的post.user、post.title、post.create_date都是undefine 这些不会报错 只是没有数据 但是post.user.nickname就会有问题 因为再undefine里是找不到nickname的 所以会报错 要解决 就给user设置成一个空对象 就算没有数据也不会报错 最多是空的
      },
      list: [],
      isShowTextArea: false,
      text: '',
      huifuName: '',
      huifuId: ''
    }
  },
  methods: {
    async getpost() {
      // console.log(this.$route.params.id)
      const id = this.$route.params.id

      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    async getCommentList() {
      const res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      console.log(res.data)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async follow() {
      // 先判断用户有没有登录
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '只有登录才能关注，确认要登录账户吗？'
          })
          localStorage.setItem('backurl', this.$route.path) // 跳转登录前先把回跳地址保存到localStorage
          this.$router.push({
            path: '/login'
          })
        } else {
          const res = await this.$axios.get(
            `/user_follows/${this.post.user.id}`
          )
          // console.log(res.data)
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getpost() // 重新渲染页面
          }
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async nofollow() {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getpost() //
      }
    },
    async dianzan() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '只有登录才能点赞，确认要登录账户吗？'
          })
          localStorage.setItem('backurl', this.$route.path) // 跳转登录前先把回跳地址保存到localStorage
          this.$router.push({
            path: '/login'
          })
        } else {
          const res = await this.$axios.get(
            `post_like/${this.post.id}`
          )
          // console.log(res.data)
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getpost() // 重新渲染页面
          }
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async shoucang() {
      // 先判断用户有没有登录
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '只有登录才能收藏，确认要登录账户吗？'
          })
          localStorage.setItem('backurl', this.$route.path) // 跳转登录前先把回跳地址保存到localStorage
          this.$router.push({
            path: '/login'
          })
        } else {
          const res = await this.$axios.get(
            `/post_star/${this.post.id}`
          )
          // console.log(res.data)
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getpost() // 重新渲染页面
          }
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async focus() { // input获取焦点
      this.isShowTextArea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    blur() { // 失去焦点
      if (!this.text) {
        this.isShowTextArea = false
      }
    },
    async fasong() {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.text,
        parent_id: this.huifuId
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.isShowTextArea = false
        this.getCommentList()
        this.getpost()// 重新加载文章详情 是为了更新评论条数
        this.$toast.success(message)
        // 清空原来的评论内容
        this.text = ''
        this.huifuName = ''
        this.huifuId = ''
      }
    },
    async huifu(name, id) {
      this.huifuName = name
      this.huifuId = id
      this.isShowTextArea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 50px;
  .header {
  display: flex;
  height: 50px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  align-items: center;
  padding: 20px;
  .center {
    flex: 1;
    margin-left: 10px;
    span {
      font-size: 55px;
    }
  }
  .right {
    span {
      display: inline-block;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      width: 70px;
      text-align: center;

      border-radius: 10px;
      margin-top: 5px;
    }
    .follow {
      color: white;
      background-color: red;
    }
    .onfollow {
      color: #333;
      border: 1px solid #ccc;
    }
  }
}
.content {
  // padding: 20px;
  .titel,
  .user,
  .info,
  video {
    padding: 0 20px;
  }
  .titel {
    padding: 10px 0;
    font-size: 16px;
    font-weight: 700;
  }
  .user {
    color: #999;
    font-size: 12px;
    margin: 10px 0;
    span {
      margin-right: 10px;
    }
  }
  .info {
    font-size: 12px;
    /deep/img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .buts {
    display: flex;
    font-size: 16px;
    justify-content: space-around;
    padding: 20px;
    border-bottom: 3px solid #ccc;
    .dianzan,
    .wx {
      width: 80px;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 15px;
      text-align: center;
    }
    .bianred {
      color: red;
      border:1px solid red;
    }
    .iconweixin {
      color: rgb(0, 200, 0);
    }
  }
}
footer {
  .input {
    position: fixed;
    border-top: 1px solid #ccc;
    padding: 0 20px;
    background-color: #fff;
    bottom: 0;
    height: 50px;
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    input {
      width: 180px;
      height: 30px;
      font-size: 14px;
      color:#999;
      border: 1px solid #eee;
      border-radius: 15px;
      background-color: #eee;
      padding-left: 10px;
    }
    span {
      font-size: 30px;
    }
    .iconpinglun-{
      position: relative;
      .tiaoshu {
      position: absolute;
      top: -10px;
      left: 12px;
      padding: 0 5px;
      border-radius: 5px;
      background-color: red;
      font-size: 12px;
      }
    }
    .redbian {
      color: red;
    }
  }
  .textarea {
    position: fixed;
    border-top: 1px solid #ccc;
    padding: 0 20px;
    background-color: #fff;
    bottom: 0;
    height: 120px;
    width: 100%;
    display: flex;
    align-items: flex-end;
    textarea {
      background-color: #ddd;
      margin: 10px 0;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      width: 260px;
      height: 100px;
      padding: 10px;
    }
    span {
      font-size: 14px;
      background-color: red;
      width: 60px;
      height: 26px;
      border-radius: 13px;
      color: #fff;
      text-align: center;
      margin: 0 0 10px 10px;
    }
  }
}
.pinglun {
  h3 {
    font-size: 26px;
    text-align: center;
    padding: 20px 0;
    font-weight: normal;
  }
}

}

</style>
