import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/users'

const getUser = () => {
  return httpClient.get(`${END_POINT}/me`, {
    headers: setAuthToken()
  })
}

const login = (formData: any) => {
  return httpClient.post(`${END_POINT}/login`, formData)
}

const register = (formData: any) => {
  return httpClient.post(`${END_POINT}/register`, formData)
}

export { getUser, login, register }
