import React, { useReducer } from 'react'
import { initialState, ProfileContext } from './ProfileContext'
import { profileReducer } from './profileReducer'

const ProfileProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileProvider }
