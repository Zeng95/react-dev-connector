import { setAuthToken } from 'utils'
import httpClient from './httpClient'

const END_POINT = '/profiles'

const getGithubReposByUsername = (username: string) => {
  return httpClient.get(`${END_POINT}/${username}`)
}

const getProfiles = () => {
  return httpClient.get(`${END_POINT}/all`)
}

const getProfileById = (userId: string) => {
  return httpClient.get(`${END_POINT}/${userId}`)
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
  getGithubReposByUsername,
  getProfiles,
  getProfileById,
  getProfile,
  createProfile,
  updateProfile,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation
}
