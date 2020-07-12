<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <!-- 视频结构 -->
    <div class="shipin" v-if="post.type === 2">
      <div class="content">
        <div class="titel">{{ post.title }}</div>
      </div>
      <div class="video">
        <img :src="$url(post.cover[0].url)" alt="" />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="name">
        <span>{{ post.user.nickname }}</span>
        <!-- 这里的length要改一下 后端返回的不一样 -->
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
    <!-- 单图结构 -->
    <div class="dantu" v-else-if="post.cover.length < 3">
      <div class="content">
        <div class="titel">{{ post.title }}</div>
        <div class="name">
          <span>{{ post.user.nickname }}</span>
          <!-- 这里的length要改一下 后端返回的不一样 -->
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt="" />
      </div>
    </div>
    <!-- 多图结构 -->
    <div class="duotu" v-else>
      <div class="content">
        <div class="titel">{{ post.title }}</div>
      </div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt="" />
        <img :src="$url(post.cover[1].url)" alt="" />
        <img :src="$url(post.cover[2].url)" alt="" />
      </div>
      <div class="name">
        <span>{{ post.user.nickname }}</span>
        <!-- 这里的length要改一下 后端返回的不一样 -->
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.hm-post {
  .name {
    color: #999;
    span {
      margin-right: 10px;
    }
  }

  .shipin {
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .video {
      position: relative;
      img {
        width: 340px;
        height: 170px;
        object-fit: cover;
      }
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 46px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: 30px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
      }
    }
  }
  .dantu {
    font-size: 16px;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .img {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
  .duotu {
    font-size: 16px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .img {
      img {
        width: 112px;
        height: 74px;
        object-fit: cover;
      }
      margin: 10px 0;
    }
  }
}
</style>
