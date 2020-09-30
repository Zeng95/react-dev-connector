import React, { createContext, useReducer } from 'react'

type InitialStateType = {
  user: null
  isAuthenticated: boolean
}

type payloadType = {}

type ACTIONTYPE =
  | { type: 'LOGIN'; payload: null }
  | { type: 'REGISTER'; payload: null }
  | { type: 'LOGOUT'; payload: null }

const initialState = {
  user: null,
  isAuthenticated: false
}

const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const authReducer = (state: InitialStateType, action: any) => {
  const { type, payload } = action

  switch (type) {
    case 'LOGIN':
      localStorage.setItem('auth-token', JSON.stringify(payload.token))
      return { ...state, isAuthenticated: true, user: payload.user }
    case 'REGISTER':
      localStorage.setItem('auth-token', JSON.stringify(payload.token))
      return { ...state, isAuthenticated: true, user: payload.user }
    case 'LOGOUT':
      localStorage.clear()
      return { ...state, isAuthenticated: false, user: null }
    default:
      return state
  }
}

const AuthContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
