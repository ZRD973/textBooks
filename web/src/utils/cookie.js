import Cookies from 'js-cookie'

export function setToken (token) {
  Cookies.set('Authorization', token, { expires: 7 })
}

export function getToken () {
  return Cookies.get('Authorization')
}

export function removeToken () {
  Cookies.remove('Authorization')
}
