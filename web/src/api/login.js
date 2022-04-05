import { request } from '@/utils/request'

export function login (data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getCurUserInfo () {
  return request({
    url: '/api/user/info'
  })
}

export function roleMenu () {
  return request({
    url: '/api/user/menu'
  })
}

export function changePsw (data) {
  return request({
    url: '/api/change/psw',
    method: 'post',
    data
  })
}
