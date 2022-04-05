import { request } from '@/utils/request'

export function query () {
  return request({
    url: '/api/role/query'
  })
}

export function page (params) {
  return request({
    url: '/api/role/page',
    params
  })
}

export function create (data) {
  return request({
    url: '/api/role/create',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/role/update',
    method: 'post',
    data
  })
}

export function roleDelete (data) {
  return request({
    url: '/api/role/delete',
    method: 'post',
    data
  })
}
