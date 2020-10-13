import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/profiles'

const getAllProfiles = () => {
  return httpClient.get(`${END_POINT}`)
}

const getProfile = () => {
  return httpClient.get(`${END_POINT}/me`, {
    headers: setAuthToken()
  })
}

const getProfileByUserId = userId => {
  return httpClient.get(`${END_POINT}/${userId}`)
}

const createProfile = profile => {
  return httpClient.post(`${END_POINT}`, profile, {
    headers: setAuthToken()
  })
}

const updateProfile = (profile, userId) => {
  return httpClient.put(`${END_POINT}/${userId}`, profile, {
    headers: setAuthToken()
  })
}

export {
  getProfile,
  getProfileByUserId,
  getAllProfiles,
  createProfile,
  updateProfile
}
