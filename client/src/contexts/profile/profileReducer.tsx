import { GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE } from '../types'

type ProfileType = {
  id: number
  name: string
  price: number
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
      return { ...state, profile: payload }
    case CREATE_PROFILE:
      return { ...state, ...payload }
    case UPDATE_PROFILE:
      return { ...state, ...payload }
    default:
      return state
  }
}
