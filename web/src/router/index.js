import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '../utils/cookie'
import { roleMenu } from '@/api/login'
import store from '@/store'

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: '1',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/change/psw',
    component: () => import('../views/index/Home.vue'),
    redirect: '/change/psw',
    hidden: '1',
    children: [
      {
        path: '',
        component: () => import('@/views/index/ChangePsw'),
        name: 'ChangePsw',
        hidden: '0',
        meta: { title: '修改密码', icon: '' }
      }
    ]
  },
  {
    path: '/:w+',
    component: () => import('@/views/index/404.vue'),
    hidden: '1'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

const whiteList = ['/login']
router.beforeEach((to, from, next) => {

  document.title = to.meta.title || '系统'

  const token = getToken()
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (store.getters.addRouters.length === 0) {
        roleMenu().then(res => {
          store.dispatch('generateRoutes', res.data).then(() => {
            store.getters.addRouters.forEach(item => {
              router.addRoute(item)
            })
            next({ ...to, replace: true })
          })
        })
        store.dispatch('getCurUserInfo')
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from) => {
  setKeepAlive(to)
})

function setKeepAlive(to) {
  if(to.meta.keep_alive === '1') {
    store.commit("setKeepAlive", to.name);
  }
}

export default router
