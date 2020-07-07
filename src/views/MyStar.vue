<template>
  <div class="mystar">
      <hm-header>我的收藏</hm-header>
      <div class="list">
          <div class="item" v-for="item in list" :key="item.id">
              <div class="content">
                  <div class="titel">{{item.title}}</div>
                  <div class="name">
                    <span>{{item.user.nickname}}</span>
                    <span>{{item.comments.length}}跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src="$url(item.cover[0].url)" alt="">
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
    async getList() {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
    .item {
        font-size: 16px;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
                color: #999;
                span {
                    margin-right: 10px;
                }
            }
        }
        .img{
            img {
                width: 121px;
                height: 75px;
                object-fit: cover;
            }
        }
    }
}
</style>
