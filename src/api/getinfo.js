import request from '@/utils/request'

export function getuser(token) {
  return request({
    url: '/user/getuser?offset=0&ipage=100',
    method: 'get',
    params: { token }
  })
}
export function getmeetroom(token) {
  return request({
    url: '/meet/getMeet?offset=0&ipage=100',
    method: 'get',
    params: { token }
  })
}
export function getrecord(token) {
  return request({
    url: '/record/getRecord?offset=0&ipage=100',
    method: 'get',
    params: { token }
  })
}
