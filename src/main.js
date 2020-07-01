import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import { Button, Field } from 'vant'
import './styles/common.less'
import './styles/iconfont.less'
import router from './router'
Vue.config.productionTip = false // 关闭浏览器的提醒

Vue.use(Button)
Vue.use(Field)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
