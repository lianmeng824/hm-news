import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import { Button, Field } from 'vant'
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Field)
new Vue({
  render: h => h(App)
}).$mount('#app')
