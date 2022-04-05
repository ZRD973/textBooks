import { request } from '@/utils/request'

export function operateRecord (data) {
  return request({
    url: '/api/record',
    method: 'post',
    data
  })
}

export function operateStore (data) {
  return request({
    url: '/api/store',
    method: 'post',
    data
  })
}

export function continueRecord (data) {
  return request({
    url: '/api/continue/record',
    method: 'post',
    data
  })
}


export function analyseApply (data) {
  return request({
    url: '/api/analyse/apply',
    method: 'post',
    data
  })
}


