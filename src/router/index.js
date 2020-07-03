import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/user-edit', component: UserEdit, name: 'user-edit' }
  ]
})

// 配置全局导航守卫 用于拦截未登录的用户
// to: 到哪儿去
// from: 从哪儿来
// next(): 代表放行 会继续加载渲染页面 如果没有next() 相当于直接拦截整个页面
const pages = ['/user', '/user-edit'] // 保存所有需要登录才能访问的页面
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  // 如果是user页面 要判断是否有token
  if (pages.includes(to.path)) {
    // includes 判断是否包含某个字符串 返回布尔值
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
