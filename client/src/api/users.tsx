import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/users'

const getUser = () => {
  return httpClient.get(`${END_POINT}/me`, {
    headers: setAuthToken()
  })
}

export { getUser }
