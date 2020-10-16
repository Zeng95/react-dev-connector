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

const updateProfile = profile => {
  return httpClient.put(`${END_POINT}`, profile, {
    headers: setAuthToken()
  })
}

const updateProfileExperience = experience => {
  return httpClient.put(`${END_POINT}/experience`, experience, {
    headers: setAuthToken()
  })
}

const deleteProfileExperience = experienceId => {
  return httpClient.delete(`${END_POINT}/experience/${experienceId}`, {
    headers: setAuthToken()
  })
}

const updateProfileEducation = education => {
  return httpClient.put(`${END_POINT}/education`, education, {
    headers: setAuthToken()
  })
}

const deleteProfileEducation = educationId => {
  return httpClient.delete(`${END_POINT}/education/${educationId}`, {
    headers: setAuthToken()
  })
}

export {
  getProfile,
  getProfileByUserId,
  getAllProfiles,
  createProfile,
  updateProfile,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation
}
