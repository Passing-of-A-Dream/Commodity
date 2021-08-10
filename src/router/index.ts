import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginRegister.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 守卫模式
router.beforeEach(function (to, from, next) {
  const userName = store.getters.getUserName
  // 判断当前url是否要求验证
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // 判断用户是否登陆，以及是否记录用户信息
    if (userName === '') {
      // 跳转到登录界面
      next('/login')
    } else {
      // 保留在当前url
      next()
    }
  } else {
    next()
  }
})

export default router
