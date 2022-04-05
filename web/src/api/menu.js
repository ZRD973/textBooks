import { request } from '@/utils/request'

export function queryTree () {
  return request({
    url: '/api/menu/query/tree'
  })
}

export function create (data) {
  return request({
    url: '/api/menu/create',
    method: 'post',
    data
  })
}

export function deleteMenu (data) {
  return request({
    url: '/api/menu/delete',
    method: 'post',
    data
  })
}

export function update (data) {
  return request({
    url: '/api/menu/update',
    method: 'post',
    data
  })
}

export function roleMenuUpdate (data) {
  return request({
    url: '/api/role/menu/update',
    method: 'post',
    data
  })
}

export function roleMenu (params) {
  return request({
    url: '/api/role/menu',
    params
  })
}
