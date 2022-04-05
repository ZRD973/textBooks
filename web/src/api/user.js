import { request } from '@/utils/request'

export function page (params) {
  return request({
    url: '/api/user/page',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/user/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}

export function userDelete (data) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data
  })
}

export function getUsersByRole (params) {
  return request({
    url: '/api/users/by/role',
    params
  })
}

export function resetPsw (data) {
  return request({
    url: '/api/reset/psw',
    method: 'post',
    data
  })
}
