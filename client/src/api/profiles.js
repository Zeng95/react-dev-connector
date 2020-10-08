import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/profiles'

const getProfile = () => {
  return httpClient.get(`${END_POINT}/me`, { headers: setAuthToken() })
}

const getProfileByUserId = userId => {
  return httpClient.get(`${END_POINT}/${userId}`)
}

const getAllProfiles = () => {
  return httpClient.get(`${END_POINT}`)
}

const createProfile = profile => {
  return httpClient.post(`${END_POINT}`, profile, { headers: setAuthToken() })
}

const updateProfile = profile => {
  return httpClient.put(`${END_POINT}`, profile, { headers: setAuthToken() })
}

export {
  getProfile,
  getProfileByUserId,
  getAllProfiles,
  createProfile,
  updateProfile
}
