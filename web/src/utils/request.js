import axios from 'axios'
import { getToken, removeToken } from './cookie'
import router from '../router'
import { ElMessageBox } from 'element-plus'
import store from '../store'

export function request (config) {
  const ins = axios.create({})

  ins.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  ins.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    const status = error.response.status
    if (status === 401 && !store.state.loginInvalidBox) {
      store.commit('setLoginInvalidBox', true)
      ElMessageBox.confirm('登录已过时！', '注销', {
        confirmButtonText: '返回登录',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        removeToken()
        store.commit('setLoginInvalidBox', false)
        router.push('/login')
      })
    }
    return Promise.reject(error)
  })

  return ins(config)
}
