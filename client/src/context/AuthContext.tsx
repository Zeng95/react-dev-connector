import React, { createContext, useReducer, FunctionComponent } from 'react'

type InitialStateType = {
  user: null
  isAuthenticated: boolean
}

const initialState = {
  user: null,
  isAuthenticated: false
}

const AuthContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('auth-token', JSON.stringify(action.payload.token))
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case 'REGISTER':
      localStorage.setItem('auth-token', JSON.stringify(action.payload.token))
      return { ...state, isAuthenticated: true, user: action.payload.user }
    case 'LOGOUT':
      localStorage.clear()
      return { ...state, isAuthenticated: false, user: null }
    default:
      return state
  }
}

const AuthContextProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
