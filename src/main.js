import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import { Button, Field, Form, Toast } from 'vant'
import './styles/common.less'
import './styles/iconfont.less'
import router from './router'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.config.productionTip = false // 关闭浏览器的提醒
Vue.component('hm-header', HmHeader) // 全局注册公共头部组件
Vue.component('hm-login', HmLogo)
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
