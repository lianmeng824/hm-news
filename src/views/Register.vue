<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-login></hm-login>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名/手机号"
        :rules="rules.username"
      />
      <van-field
        v-model="nickname"
        type="nickname"
        label="昵称"
        placeholder="请输入昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p>已有账号去 <router-link to="/login">登录</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      rules: {
        username: [
          {
            required: true,
            message: '请填写用户名/手机号',
            trigger: 'onChange'
          },
          {
            pattern: /^\d{5,11}$/,
            message: '请输入5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\w{3,9}$/,
            message: '请输入3-9位',
            trigger: 'onChange'
          }
        ],
        nickname: [
          { required: true, message: '请填写昵称', trigger: 'onChange' },
          {
            pattern: /^[\u4e00-\u9fa5]{2,5}$/,
            message: '请输入2-5位中文',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      //   console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  p {
    font-size: 16px;
    text-align: right;
    padding-right: 20px;
    a {
      color: #d81e06;
    }
  }
}
</style>
