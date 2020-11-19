import {
  createProfile,
  createProfileEducation,
  createProfileExperience,
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
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  SHOW_BTN_LOADING,
  SHOW_DATA_LOADING,
  UPDATE_PROFILE
} from 'context/types'
import { createContext } from 'react'

interface IUser {
  _id: string
  email: string
  avatar: string
  username: string
}

interface ISocial {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  weibo: string
}

interface IExperience {
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string
  description: string
  current: boolean
}

interface IEducation {
  _id: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  description: string
  current: boolean
}

interface IProfile {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  social?: ISocial
  user: IUser
  experience: IExperience[]
  education: IEducation[]
}

interface IRepository {
  id: number
  name: string
  price: number
}

interface InitialStateType {
  state: {
    profile: IProfile | null
    profiles: IProfile[]
    repos: IRepository[]
    dataLoading: boolean
    submitLoading: boolean
  }
  actions: {
    getAllProfiles: () => any
    getSignleProfile: (userId: string) => any
    getCurrentProfile: () => any
    clearCurrentProfile: () => any
    createUserProfile: (profile: any) => any
    updateUserProfile: (profile: any) => any
    createUserProfileExperience: (experience: any) => any
    updateUserProfileExperience: (experienceId: string, experience: any) => any
    deleteUserProfileExperience: (experienceId: string) => any
    createUserProfileEducation: (education: any) => any
    updateUserProfileEducation: (educationId: string, education: any) => any
    deleteUserProfileEducation: (educationId: string) => any
  }
}

const initialState = {
  state: {
    profile: null,
    profiles: [],
    repos: [],
    dataLoading: true,
    submitLoading: false
  },
  actions: {
    getAllProfiles: () => {},
    getSignleProfile: () => {},
    getCurrentProfile: () => {},
    clearCurrentProfile: () => {},
    createUserProfile: () => {},
    updateUserProfile: () => {},
    createUserProfileExperience: () => {},
    updateUserProfileExperience: () => {},
    deleteUserProfileExperience: () => {},
    createUserProfileEducation: () => {},
    updateUserProfileEducation: () => {},
    deleteUserProfileEducation: () => {}
  }
}

const ProfileContext = createContext<InitialStateType>(initialState)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: profileState } = state

  switch (type) {
    case SHOW_DATA_LOADING:
      return {
        ...state,
        state: {
          ...profileState,
          dataLoading: true
        }
      }
    case SHOW_BTN_LOADING:
      return {
        ...state,
        state: {
          ...profileState,
          submitLoading: true
        }
      }
    case GET_PROFILES:
      return {
        ...state,
        state: {
          ...profileState,
          profiles: payload.profiles,
          dataLoading: false
        }
      }
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        state: {
          ...profileState,
          profile: payload.profile,
          dataLoading: false,
          submitLoading: false
        }
      }
    case CLEAR_PROFILE:
    case PROFILE_ERROR:
      return {
        ...state,
        state: {
          ...profileState,
          profile: null,
          repos: [],
          dataLoading: false
        }
      }
    case GET_REPOS:
      return {
        ...state,
        state: {
          ...profileState,
          repos: payload,
          dataLoading: false
        }
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
  getAllProfiles: async () => {
    try {
      dispatch({
        type: SHOW_DATA_LOADING
      })

      const res = await getProfiles()

      dispatch({
        type: GET_PROFILES,
        payload: { profiles: res.data.profiles }
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR
      })
    }
  },
  getSignleProfile: async (userId: string) => {
    try {
      dispatch({
        type: SHOW_DATA_LOADING
      })

      const res = await getProfileById(userId)

      dispatch({
        type: GET_PROFILE,
        payload: { profile: res.data.profile }
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR
      })
    }
  },
  getCurrentProfile: async () => {
    try {
      dispatch({
        type: SHOW_DATA_LOADING
      })

      const res = await getProfile()

      dispatch({
        type: GET_PROFILE,
        payload: { profile: res.data.profile }
      })
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR
      })
    }
  },
  clearCurrentProfile: () => {
    dispatch({
      type: CLEAR_PROFILE
    })
  },
  createUserProfile: (profile: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await createProfile(profile)

        dispatch({
          type: GET_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },
  updateUserProfile: (profile: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await updateProfile(profile)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },

  createUserProfileExperience: (experience: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await createProfileExperience(experience)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },
  updateUserProfileExperience: (experienceId: string, experience: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await updateProfileExperience(experienceId, experience)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },
  deleteUserProfileExperience: (experienceId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteProfileExperience(experienceId)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },

  createUserProfileEducation: (education: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await createProfileEducation(education)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },
  updateUserProfileEducation: (educationId: string, education: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await updateProfileEducation(educationId, education)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  },
  deleteUserProfileEducation: (educationId: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await deleteProfileEducation(educationId)

        dispatch({
          type: UPDATE_PROFILE,
          payload: { profile: res.data.profile }
        })

        resolve()
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR
        })

        reject()
      }
    })
  }
})

export { ProfileContext, initialState, reducer, actions }
