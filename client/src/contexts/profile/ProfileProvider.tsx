import { getProfile } from 'api/profiles'
import { AuthContext } from 'contexts/auth/AuthContext'
import React, { useContext, useEffect, useReducer } from 'react'
import { Notification } from 'rsuite'
import { initialState, ProfileContext } from './ProfileContext'
import { profileReducer } from './profileReducer'

const ProfileProvider: React.FC = ({ children }) => {
  const auth = useContext(AuthContext)
  const { token } = auth.state

  const [state, dispatch] = useReducer(profileReducer, initialState)
  const { profile } = state

  const getCurrentProfile = async () => {
    try {
      const response = await getProfile()
      const { profile: newProfile } = response.data

      dispatch({ type: 'GET_PROFILE', payload: newProfile })
    } catch (err) {
      Notification.error({
        title: 'info',
        description: err.response.data.msg
      })
    }
  }

  useEffect(() => {
    if (!profile && token) {
      getCurrentProfile()
    }
  }, [profile, token])

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileProvider }
