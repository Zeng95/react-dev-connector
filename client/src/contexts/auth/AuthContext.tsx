import React, { createContext, useReducer } from 'react'
import { authReducer } from './authReducer'

type InitialStateType = {
  user: null
  token: string | null
  isAuthenticated: boolean
}

const initialState = {
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: false
}

const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
