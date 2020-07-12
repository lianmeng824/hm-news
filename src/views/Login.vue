<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-login></hm-login>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="rules.username"
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
    <p>没有账号？去 <router-link to="/register">注册</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '请输入5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\w{3,9}$/, message: '请输入3-9位', trigger: 'onChange' }
        ]
      }
    }
  },
  created() {
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
    // console.log(this.$route.params)
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })

      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        console.log(res.data)
        this.$toast.success(message)
        localStorage.setItem('token', data.token) // 存token
        localStorage.setItem('userId', data.user.id) // 存ID
        // this.$router.push('/user')
        const backurl = localStorage.getItem('backurl')
        if (backurl) {
          // 如果localStorage有这个地址 直接回跳到这个地址
          this.$router.push(backurl)
          localStorage.removeItem('backurl')
        } else {
          // 如果没有这个参数 就跳到个人中心
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
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
