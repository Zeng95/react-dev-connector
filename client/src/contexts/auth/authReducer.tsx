import { AUTH_ERROR, LOGIN, LOGOUT, REGISTER, USER_LOADED } from '../types'

type UserType = {
  id: string
  avatar: string
  email: string
  username: string
}

type InitialStateType = {
  user: UserType
  token: string
  isAuthenticated: boolean
}

export const authReducer = (state: InitialStateType, action: any) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return { ...state, ...payload, isAuthenticated: true }
    case LOGIN:
    case REGISTER:
      localStorage.setItem('auth-token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('auth-token')
      return { user: null, token: null, isAuthenticated: false }
    default:
      return state
  }
}
