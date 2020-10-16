import { AUTH_ERROR, LOGIN, LOGOUT, REGISTER, USER_LOADED } from '../types'
import { InitialStateType } from './AuthContext'

export const authReducer = (state: InitialStateType, action: any) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case LOGIN:
    case REGISTER:
      localStorage.setItem('auth-token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('auth-token')
      return { user: null, token: null, isAuthenticated: false, loading: true }
    default:
      return state
  }
}
