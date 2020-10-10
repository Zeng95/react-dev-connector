import { createContext } from 'react'

type UserType = {
  id: string | null
  avatar: string | null
  email: string | null
  username: string | null
}

type InitialStateType = {
  user: UserType | null
  token: string | null
  isAuthenticated: boolean
}

export const initialState = {
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: false
}

export const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})
