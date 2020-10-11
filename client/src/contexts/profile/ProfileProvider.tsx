import { getProfile } from 'api/profiles'
import { AuthContext } from 'contexts/auth/AuthContext'
import React, { useContext, useEffect, useReducer } from 'react'
import { Alert } from 'rsuite'
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
      const { response, message } = err

      if (response) {
        const { errors, msg } = response.data

        if (errors) {
          errors.forEach((error: any) => Alert.error(error.msg))
        } else {
          Alert.error(msg)
        }
      } else {
        Alert.error(message)
      }

      dispatch({ type: 'AUTH_ERROR' })
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
