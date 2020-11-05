import { setAuthToken } from 'utils'
import httpClient from './httpClient'

const END_POINT = '/profiles'

const getGithubReposByUsername = (username: string) => {
  return httpClient.get(`${END_POINT}/${username}`)
}

const getProfiles = () => {
  return httpClient.get(`${END_POINT}/all`)
}

const getProfile = () => {
  return httpClient.get(`${END_POINT}/me`, {
    headers: setAuthToken()
  })
}

const getProfileById = (userId: string) => {
  return httpClient.get(`${END_POINT}/${userId}`)
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

const createProfileExperience = (experience: any) => {
  return httpClient.post(`${END_POINT}/experience`, experience, {
    headers: setAuthToken()
  })
}

const updateProfileExperience = (experienceId: string, experience: any) => {
  return httpClient.put(`${END_POINT}/experience/${experienceId}`, experience, {
    headers: setAuthToken()
  })
}

const deleteProfileExperience = (experienceId: string) => {
  return httpClient.delete(`${END_POINT}/experience/${experienceId}`, {
    headers: setAuthToken()
  })
}

const createProfileEducation = (education: any) => {
  return httpClient.post(`${END_POINT}/education`, education, {
    headers: setAuthToken()
  })
}

const updateProfileEducation = (educationId: string, education: any) => {
  return httpClient.put(`${END_POINT}/education/${educationId}`, education, {
    headers: setAuthToken()
  })
}

const deleteProfileEducation = (educationId: string) => {
  return httpClient.delete(`${END_POINT}/education/${educationId}`, {
    headers: setAuthToken()
  })
}

export {
  getGithubReposByUsername,
  getProfiles,
  getProfile,
  getProfileById,
  createProfile,
  updateProfile,
  createProfileExperience,
  updateProfileExperience,
  deleteProfileExperience,
  createProfileEducation,
  updateProfileEducation,
  deleteProfileEducation
}
