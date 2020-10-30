import {
  createProfile,
  deleteProfileEducation,
  deleteProfileExperience,
  getGithubReposByUsername,
  getProfile,
  getProfileById,
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
  SHOW_LOADING,
  UPDATE_PROFILE
} from 'context/types'
import { createContext } from 'react'

interface UserType {
  _id: string
  avatar: string
  email: string
  username: string
}

interface ExperienceType {
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string
  description: string
}

interface EducationType {
  _id: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  description: string
}

interface SocialType {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  weibo: string
}

interface ProfileType {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  social?: SocialType
  user: UserType
  experience: ExperienceType[]
  education: EducationType[]
}

interface RepositoryType {
  id: number
  name: string
  price: number
}

interface ErrorType {
  msg: string
  status: string
}

interface InitialStateType {
  state: {
    profile: ProfileType | null
    profiles: ProfileType[]
    repos: RepositoryType[]
    error: ErrorType | {}
    pageLoading: boolean
  }
  actions: {
    getAllUsersProfiles: () => any
    getCurrentUserProfile: () => any
    getUserProfileByUserId: (userId: string) => any
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
    pageLoading: true
  },
  actions: {
    getAllUsersProfiles: () => {},
    getCurrentUserProfile: () => {},
    getUserProfileByUserId: () => {},
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
    case SHOW_LOADING:
      return {
        ...state,
        state: { ...profileState, pageLoading: true }
      }
    case GET_PROFILES:
      return {
        ...state,
        state: { ...profileState, profiles: payload, pageLoading: false }
      }
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        state: { ...profileState, profile: payload, pageLoading: false }
      }
    case PROFILE_ERROR:
      return {
        ...state,
        state: { ...profileState, error: payload, pageLoading: false }
      }
    case GET_REPOS:
      return {
        ...state,
        state: { ...profileState, repos: payload, pageLoading: false }
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
      dispatch({
        type: SHOW_LOADING
      })

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
  getUserProfileByUserId: async (userId: string) => {
    try {
      dispatch({
        type: SHOW_LOADING
      })

      const res = await getProfileById(userId)

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
