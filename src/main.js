import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import {
  Button,
  Field,
  Form,
  Toast,
  Dialog,
  RadioGroup,
  Radio,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'
import './styles/common.less'
import './styles/iconfont.less'
import router from './router'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmNavbar from './components/HmNavbar.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'

//
import axios from 'axios'
import moment from 'moment'
Vue.prototype.$axios = axios // 把axios挂在到vue的原型上 只要不是vue的插件 就可以挂在vue的原型上
axios.defaults.baseURL = 'http://localhost:3000' // 配置axios的默认地址

// 给axios配置请求拦截器
// interceptors 拦截器   request 请求
axios.interceptors.request.use(function(config) {
  // config 固定值 浏览器发送ajax请求的所有配置信息
  const token = localStorage.getItem('token')
  if (token) {
    // 如果有token 就给所有请求带上这个token 一定要有这个判断
    config.headers.Authorization = token // token用于身份验证 必须有这个token 才能进行验证
  }
  return config // 一定要返回
})

// 给axios配置响应拦截器
// response 响应
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message) // 提示信息
    router.push('/login') // 跳到登录页面
    localStorage.removeItem('token') // 删除失效的token
    localStorage.removeItem('userId') // 删除失效的userId
  }
  return res // 一定要返回
})
//
Vue.config.productionTip = false // 关闭浏览器的提醒
Vue.component('hm-header', HmHeader) // 全局注册公共头部组件
Vue.component('hm-login', HmLogo)
Vue.component('hm-navbar', HmNavbar)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)

// 全局的设置moment的语言环境
moment.locale('zh-CN')
Vue.filter('time', function(input, str = 'YYYY-MM-DD') {
  return moment(input).format(str)
})

Vue.filter('fromNow', function(input) { // 指定时间到当前时间之间的差值
  // return moment(input).fromNow()
  const now = Date.now()
  const start = new Date(input)
  const time = parseInt((now - start) / 1000)
  // console.log(time)
  const month = parseInt(time / 60 / 60 / 24 / 30)
  const days = parseInt(time / 60 / 60 / 24)
  const hours = parseInt(time / 60 / 60)
  const minutes = parseInt(time / 60)
  // console.log(month, days, hours, minutes, time)
  if (month > 0) {
    return month + '月前'
  } else if (days > 0) {
    return days + '天前'
  } else if (hours > 0) {
    return hours + '小时前'
  } else if (minutes > 0) {
    return minutes + '分钟前'
  } else {
    return time + '秒前'
  }
})

Vue.use(Button) // 全局注册 vant-button
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast) // 会在vue的原型上添加一个$toast方法
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

Vue.prototype.$url = function(url) {
  // 解决图片地址不一样的问题 有网络图片 也有上传图片
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

// 创建一个bus对象 挂在vue原型上
const bus = new Vue()
Vue.prototype.$bus = bus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
