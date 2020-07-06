<template>
  <div class="user">
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avatar">
        <img :src="this.$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="info">
        <p class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p>{{ info.create_date | time }}</p>
      </div>
      <div class="arrow">
        <p><span class="iconfont iconjiantou1"></span></p>
      </div>
    </div>
    <div class="nav">
      <hm-navbar @click="$router.push('/myfollow')">
        <template>我的关注</template>
        <template #content>关注的用户</template>
      </hm-navbar>
      <hm-navbar>
        <template>我的跟帖</template>
        <template #content>跟帖/回复</template>
      </hm-navbar>
      <hm-navbar>
        <template>我的收藏</template>
        <template #content>文章/视频</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/user-edit')">
        <template>设置</template>
        <template #content></template>
      </hm-navbar>
      <hm-navbar @click="logout">
        <template>退出</template>
      </hm-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出登录吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
      // await this.$dialog.confirm({
      //   title: '温馨提示',
      //   message: '确定要退出登录吗？'
      // })
      //   .then(() => { // 确定退出的思路
      //     localStorage.removeItem('token')
      //     localStorage.removeItem('userId')
      //     this.$router.push('/login')
      //     this.$toast.success('退出成功')
      //   })
      //   .catch(() => { // 取消的思路
      // this.$toast('取消退出')
      //   })
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
    // 下面内容用响应拦截代替 就不用每次发请求的时候都写了
    // if (statusCode === 401) {
    //   this.$toast('用户信息验证失效') // 提示信息
    //   this.$router.push('/login') // 跳到登录页面
    //   localStorage.removeItem('token') // 删除失效的token
    //   localStorage.removeItem('userId') // 删除失效的userId
    // }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 120px;
  display: flex;
  border-bottom: 5px solid #ccc;
  align-items: center;
  padding: 0 20px;
  .avatar {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding-left: 20px;
    font-size: 16px;
    color: #999;
    .name {
      color: #333;
      margin-bottom: 10px;
      .iconxingbienv {
        color: pink;
      }
      .iconxingbienan {
        color: #80bbe4;
      }
    }
  }
}
</style>
