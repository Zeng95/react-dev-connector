import React, { createContext, useReducer } from 'react'

type InitialStateType = {
  user: object | null
  token: string | null
  isAuthenticated: boolean
}

type payloadType = {
  user: object
  token: string
}

type ActionType =
  | { type: 'REGISTER'; payload: payloadType }
  | { type: 'LOGIN'; payload: payloadType }
  | { type: 'LOGOUT'; payload: payloadType }
  | { type: 'USER_LOADED'; payload: payloadType }
  | { type: 'AUTH_ERROR'; payload: payloadType }

const initialState = {
  user: null,
  token: localStorage.getItem('auth-token'),
  isAuthenticated: false
}

const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const authReducer = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case 'USER_LOADED':
      return { ...state, ...payload, isAuthenticated: true }
    case 'REGISTER':
    case 'LOGIN':
      localStorage.setItem('auth-token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('auth-token')
      return { user: null, token: null, isAuthenticated: false }
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
