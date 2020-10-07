import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/profiles'

const getCurrentUserProfile = () => {
  return httpClient.get(`${END_POINT}/me`, { headers: setAuthToken() })
}

export { getCurrentUserProfile }
