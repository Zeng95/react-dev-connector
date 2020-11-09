import React, { useReducer } from 'react'
import {
  actions,
  initialState,
  ProfileContext,
  reducer
} from './ProfileContext'

const ProfileProvider: React.FC = props => {
  const [profile, dispatch] = useReducer(reducer, initialState)

  const reducerState = profile.state
  const reducerActions = actions(dispatch)

  const context = { state: { ...reducerState }, actions: { ...reducerActions } }

  return (
    <ProfileContext.Provider value={context}>
      {props.children}
    </ProfileContext.Provider>
  )
}

export { ProfileProvider }
