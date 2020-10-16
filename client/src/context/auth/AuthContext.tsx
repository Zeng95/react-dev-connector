import { createContext } from 'react'

export type UserType = {
  id: string | null
  avatar: string | null
  email: string | null
  username: string | null
}

export type InitialStateType = {
  user: UserType | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const initialState = {
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: false,
  loading: true
}

export const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })
