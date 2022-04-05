import { request } from '@/utils/request'

export function downloadTemp (type) {
  return request({
    url: '/api/download/' + type
  })
}
