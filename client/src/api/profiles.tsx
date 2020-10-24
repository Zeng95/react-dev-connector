import httpClient from './httpClient'
import { setAuthToken } from 'utils'

const END_POINT = '/profiles'

const getProfileByUserId = (userId: string) => {
  return httpClient.get(`${END_POINT}/${userId}`)
}

const getProfiles = () => {
  return httpClient.get(`${END_POINT}/all`)
}

const getProfile = () => {
  return httpClient.get(`${END_POINT}/me`, {
    headers: setAuthToken()
  })
}

const createProfile = (profile: any) => {
  return httpClient.post(`${END_POINT}`, profile, {
    headers: setAuthToken()
  })
}

const updateProfile = (profile: any) => {
  return httpClient.put(`${END_POINT}`, profile, {
    headers: setAuthToken()
  })
}

const updateProfileExperience = (experience: any) => {
  return httpClient.put(`${END_POINT}/experience`, experience, {
    headers: setAuthToken()
  })
}

const updateProfileEducation = (education: any) => {
  return httpClient.put(`${END_POINT}/education`, education, {
    headers: setAuthToken()
  })
}

const deleteProfileExperience = (experienceId: string) => {
  return httpClient.delete(`${END_POINT}/experience/${experienceId}`, {
    headers: setAuthToken()
  })
}

const deleteProfileEducation = (educationId: string) => {
  return httpClient.delete(`${END_POINT}/education/${educationId}`, {
    headers: setAuthToken()
  })
}

export {
  getProfile,
  getProfileByUserId,
  getProfiles,
  createProfile,
  updateProfile,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation
}
