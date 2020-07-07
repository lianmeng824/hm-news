<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="nav">
      <hm-navbar @click="showNickname">
        <template>昵称</template>
        <template #content>{{ info.nickname }}</template>
      </hm-navbar>
      <hm-navbar @click="showPassword">
        <template>密码</template>
        <template #content>******</template>
      </hm-navbar>
      <hm-navbar @click="showgender">
        <template>性别</template>
        <template #content>{{ info.gender === 1 ? '男' : '女' }}</template>
      </hm-navbar>

      <!-- 通过v-model="show" 控制弹框的显示隐藏 -->
      <!-- 修改昵称 -->
      <van-dialog
        v-model="show"
        title="修改昵称"
        show-cancel-button
        @confirm="editNickname"
      >
        <van-field v-model="nickname" placeholder="请输入新昵称" />
      </van-dialog>

      <!-- 修改密码 -->
      <van-dialog
        v-model="showpwd"
        title="修改密码"
        show-cancel-button
        @confirm="editPassword"
      >
        <van-field v-model="password" placeholder="请输入新密码" />
      </van-dialog>

      <!-- 修改性别 -->
      <van-dialog
        v-model="showGender"
        title="修改性别"
        show-cancel-button
        @confirm="editGender"
      >
        <van-radio-group v-model="gender" direction="horizontal">
          <!--后端给我们的1是数字1 所以name前面要加：号  让他变成动态的 就是数字了 才能生效-->
          <van-radio :name="1">男</van-radio>
          <van-radio :name="0">女</van-radio>
        </van-radio-group>
      </van-dialog>
    </div>
    <div class="mask" v-show="isShowMask">
      <van-button color="green" @click="crop">裁剪</van-button>
      <van-button color="red" @click="cancel">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1, 1]"
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  created() {
    this.getInfo()
  },
  data() {
    return {
      info: {},
      show: false,
      showpwd: false,
      showGender: false,
      nickname: '',
      password: '',
      gender: 0,
      isShowMask: false,
      img: ''
    }
  },
  components: {
    VueCropper
  },
  methods: {
    async getInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    async editUser(data) {
      // 封装修改昵称和密码的方法
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo() // 重新渲染 上面发送请求 已经把数据上传过了
      } else {
        this.$toast.fail(message)
      }
    },
    showNickname() {
      this.show = true // 让弹框显示
      this.nickname = this.info.nickname
    },
    async editNickname() {
      // 上面注册confirm事件 会在点击确认按钮时触发
      this.editUser({ nickname: this.nickname })
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   nickname: this.nickname
      // })
      // console.log(res)
      // const { statusCode, message } = res.data
      // if (statusCode === 200) {
      //   this.$toast.success(message)
      //   this.getInfo() // 重新渲染 上面发送请求 已经把数据上传过了
      // } else {
      //   this.$toast.fail(message)
      // }
    },
    showPassword() {
      this.showpwd = true // 让弹框显示
      this.password = this.info.password
    },
    async editPassword() {
      this.editUser({ password: this.password })
    },
    showgender() {
      this.showGender = true // 让弹框显示
      this.gender = this.info.gender
    },
    async editGender() {
      this.editUser({ gender: this.gender })
    },
    afterRead(file) {
      // 只有选中上传图片之后 才会执行这个函数 才会有file
      // 这里是用的vant-ui插件的一个方法 （文件上传）按文档来的

      // console.log(file.file) // 有上传图像的所有信息 图片大小 类型。。。。有裁剪之后也可以不用验证了 要多大就裁剪多大
      // // 校验图片大小
      // if (file.file.size / 1024 >= 25) {
      //   // 如果上传的图片大于25k
      //   this.$toast.fail('上传的图片不能大于25k')
      //   return
      // }
      // // 校验图片格式
      // const isgif = file.file.type === 'image/gif'
      // const ispng = file.file.type === 'image/png'
      // const isjpg = file.file.type === 'image/jpeg'
      // if (!(isgif || ispng || isjpg)) {
      //   this.$toast.fail('上传的图片格式只能是gif/png/jpg格式')
      //   return
      // }

      // console.log(file)

      this.isShowMask = true // 让裁剪框显示
      this.img = file.content // 动态设置裁剪的图片的地址 img地址必须指定URL地址 或者base64

      // // 此时可以自行将文件上传至服务器
      // const fd = new FormData()
      // fd.append('file', file.file) // 将要上传的文件添加到fd实例中 参数一是后端提供的文件名 参数二是要上传的文件
      // const res = await this.$axios.post('upload', fd) // 这里发送请求只能获取上传图片的地址
      // // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   this.editUser({ head_img: data.url }) // 调用封装的函数 修改头像
      // }
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        // blob就是裁剪后的数据/图片
        // 此时可以自行将文件上传至服务器
        const fd = new FormData()
        fd.append('file', blob) // 将要上传的文件添加到fd实例中 参数一是后端提供的文件名 参数二是要上传的文件
        const res = await this.$axios.post('upload', fd) // 这里发送请求只能获取上传图片的地址
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({ head_img: data.url }) // 调用封装的函数 修改头像
          this.isShowMask = false
        }
      })
    },
    cancel() {
      this.isShowMask = false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  text-align: center;
  padding: 20px 0;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    opacity: 0;
  }
}
/deep/ .van-dialog__content {
  display: flex;
  justify-content: center;
  padding: 5px 0;
  margin: 10px 20px;
  border: 1px solid #ccc;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  .van-button {
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .van-button:nth-child(1) {
    left: 0;
  }
  .van-button:nth-child(2) {
    right: 0;
  }
}
</style>
