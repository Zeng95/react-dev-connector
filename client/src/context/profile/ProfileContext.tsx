import {
  getGithubReposByUsername,
  createProfile,
  deleteProfileEducation,
  deleteProfileExperience,
  getProfile,
  getProfiles,
  updateProfile,
  updateProfileEducation,
  updateProfileExperience
} from 'api/profiles'
import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from 'context/types'
import { createContext } from 'react'

type UserType = {
  _id: string
  avatar: string
  email: string
  username: string
}

type ExperienceType = {
  title: string
  company: string
}

type EducationType = {
  school: string
  degree: string
}

type ProfileType = {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  user: UserType
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instgram: string
  weibo: string
  experience: ExperienceType[]
  education: EducationType[]
}

type RepositoryType = {
  id: number
  name: string
  price: number
}

type ErrorType = {
  msg: string
  status: string
}

type InitialStateType = {
  state: {
    profile: ProfileType | null
    profiles: ProfileType[]
    repos: RepositoryType[]
    error: ErrorType | {}
    loading: boolean
  }
  actions: {
    getAllUsersProfiles: () => any
    getCurrentUserProfile: () => any
    createUserProfile: (profile: any) => any
    updateUserProfile: (profile: any) => any
    updateUserProfileExperience: (experience: any) => any
    deleteUserProfileExperience: (experienceId: string) => any
    updateUserProfileEducation: (education: any) => any
    deleteUserProfileEducation: (educationId: string) => any
  }
}

const initialProfile = {
  state: {
    profile: null,
    profiles: [],
    repos: [],
    error: {},
    loading: true
  },
  actions: {
    getAllUsersProfiles: () => {},
    getCurrentUserProfile: () => {},
    createUserProfile: () => {},
    updateUserProfile: () => {},
    updateUserProfileExperience: () => {},
    deleteUserProfileExperience: () => {},
    updateUserProfileEducation: () => {},
    deleteUserProfileEducation: () => {}
  }
}

const ProfileContext = createContext<InitialStateType>(initialProfile)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: profileState } = state

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        state: { ...profileState, profiles: payload, loading: false }
      }
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        state: { ...profileState, profile: payload, loading: false }
      }
    case PROFILE_ERROR:
      return {
        ...state,
        state: { ...profileState, error: payload, loading: false }
      }
    case GET_REPOS:
      return {
        ...state,
        state: { ...profileState, repos: payload, loading: false }
      }
    default:
      return state
  }
}

const actions = (dispatch: React.Dispatch<any>) => ({
  getUserGithubRepos: async (username: string) => {
    try {
      const res = await getGithubReposByUsername(username)

      dispatch({
        type: GET_PROFILES,
        payload: res.data.profiles
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  getAllUsersProfiles: async () => {
    try {
      const res = await getProfiles()

      dispatch({
        type: GET_PROFILES,
        payload: res.data.profiles
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  getCurrentUserProfile: async () => {
    try {
      const res = await getProfile()

      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  createUserProfile: async (profile: any) => {
    try {
      const res = await createProfile(profile)

      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  updateUserProfile: async (profile: any) => {
    try {
      const res = await updateProfile(profile)

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  updateUserProfileExperience: async (experience: any) => {
    try {
      const res = await updateProfileExperience(experience)

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  deleteUserProfileExperience: async (experienceId: string) => {
    try {
      const res = await deleteProfileExperience(experienceId)

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  updateUserProfileEducation: async (education: any) => {
    try {
      const res = await updateProfileEducation(education)

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  deleteUserProfileEducation: async (educationId: string) => {
    try {
      const res = await deleteProfileEducation(educationId)

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  }
})

export { ProfileContext, initialProfile, reducer, actions }
