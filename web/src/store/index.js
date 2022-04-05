import { createStore } from 'vuex'
import { constantRoutes } from '@/router'
import Layout from '@/views/index/Home.vue'
import { getCurUserInfo } from '@/api/login'
import param from './modules/param'

const store = {
  state: {
    user: {},
    loginInvalidBox: false, // 登录失效盒子，只要显示一次
    routers: constantRoutes,
    addRouters: [], // 动态路由 [Vue warn]: Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.
    keepAlive: [] // 缓存的组件，点击左侧菜单需要清除对应的缓存组件，重新加载
  },
  mutations: {
    setLoginInvalidBox (state, flag) {
      state.loginInvalidBox = flag
    },
    setRouters (state, routers) {
      state.addRouters = routers
      // 和已经存在的路由表拼接
      state.routers = constantRoutes.concat(routers)
    },
    setUserInfo (state, user) {
      state.user = user
    },
    reSetRouters (state) {
      state.addRouters = []
    },
    reSetUserInfo (state) {
      state.user = {}
    },
    /**
     * 设置需要缓存的组件
     * @param {*} state 
     * @param {*} component 
     */
    setKeepAlive(state, component) {
      const index = state.keepAlive.indexOf(component)
      if(index === -1) {
        state.keepAlive.push(component)
      }
    },
    /**
     * 移除需要缓存的组件
     * @param {*} state 
     * @param {*} component 
     */
    removeKeepAlive(state, component) {
      const index = state.keepAlive.indexOf(component)
      if(index !== -1) {
        state.keepAlive.splice(index, 1)
      }
    }
  },
  actions: {
    generateRoutes ({ commit }, response) {
      const asyncRouters = filterAsyncRouter(response)
      commit('setRouters', asyncRouters)
    },
    getCurUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getCurUserInfo().then(async response => {
          window.localStorage.setItem('user',JSON.stringify(response.data));
          commit('setUserInfo', JSON.parse(localStorage.getItem('user')))
          resolve(response.data)
        }).catch(error => { reject(error) })
      })
    }
  },
  getters: {
    routers: state => state.routers,
    addRouters: state => state.addRouters
  },
  modules: {
    param
  }
}

function filterAsyncRouter (routers) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter(router => {
    router.meta = { 
      title: router.meta_title, 
      keep_alive: router.keep_alive
    }
    if (router.component === 'Layout') {
      router.component = Layout
    } else {
      // 处理组件
      router.component = loadView(router.component)
    }
    // 存在子集
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
  return accessedRouters
}

function loadView (view) {
  try {
    return require(`@/views/${view}`).default
  } catch (error) {
    return require('@/views/index/notExit').default
  }
}

export default createStore(store)
