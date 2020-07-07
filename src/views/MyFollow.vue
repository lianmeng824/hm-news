<template>
  <div class="myfollow">
    <hm-header>我的关注</hm-header>
    <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
            <div class="left">
                <img :src="$axios.defaults.baseURL + item.head_img" alt="">
            </div>
            <div class="center">
                <p>{{item.nickname}}</p>
                <p class="time">{{item.create_date}}</p>
            </div>
            <div class="right">
                <van-button round type="info" @click="upfollow(item.id)">取消关注</van-button>
            </div>
        </div>
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
      list: []
    }
  },
  methods: {
    async getList() { // 获取数据库的数据 然后才能渲染到页面
      const res = await this.$axios.get('user_follows')
      console.log(res.data)

      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async upfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '取消关注',
          message: '确定要取关改用户吗？'
        })
        const res = await this.$axios.get(`user_unfollow/${id}`)
        // console.log(res)
        const { message, statusCode } = res.data
        if (statusCode === 200) {
          this.$toast(message)
          this.getList() // 重新获取数据渲染页面
        }
      } catch {
        this.$toast('取消')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.list{
    font-size: 14px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    .item {
        height: 100px;
        display: flex;
        align-items: center;
        .left{
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .center {
            flex: 1;
            padding-left: 15px;
            .time {
                color: #999;
                margin-top: 5px;
            }

        }
        .right {
            .van-button {
                width: 80px;
                height: 42px;
                font-size: 12px;
            }
        }
    }

}

</style>
