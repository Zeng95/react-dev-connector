import { GET_PROFILE, UPDATE_PROFILE } from '../types'

type UserType = {
  id: string
  avatar: string
  email: string
  username: string
}

type ProfileType = {
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instgram: string
  user: UserType
}

type RepositoryType = {
  id: number
  name: string
  price: number
}

type InitialStateType = {
  profile: ProfileType
  profiles: ProfileType[]
  repos: RepositoryType[]
}

export const profileReducer = (state: InitialStateType, action: any) => {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return { ...state, profile: payload }
    default:
      return state
  }
}
