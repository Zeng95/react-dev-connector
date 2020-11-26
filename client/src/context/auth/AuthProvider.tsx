import React, { useReducer } from 'react'
import { actions, AuthContext, initialState, reducer } from './AuthContext'

const AuthProvider: React.FC = props => {
  const [auth, dispatch] = useReducer(reducer, initialState)
  const reducerState = auth.state
  const reducerActions = actions(dispatch)
  const context = { state: { ...reducerState }, actions: { ...reducerActions } }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
