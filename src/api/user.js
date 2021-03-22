import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login?' + 'un=' + data.username + '&pd=' + data.password,
    method: 'get',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/user/login?' + 'un=' + sessionStorage.getItem('Username') + '&pd=' + sessionStorage.getItem('Password'),
    method: 'get',
    params: { token }
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
