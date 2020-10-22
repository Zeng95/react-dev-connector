import { getAllProfiles, getCurrentProfile } from 'api/profiles'
import { AuthContext } from 'context/auth/AuthContext'
import { GET_PROFILE, GET_PROFILES } from 'context/types'
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import { Notification } from 'rsuite'
import { initialState, ProfileContext } from './ProfileContext'
import { profileReducer } from './profileReducer'

const ProfileProvider: React.FC = ({ children }) => {
  const auth = useContext(AuthContext)
  const { token } = auth.state

  const [state, dispatch] = useReducer(profileReducer, initialState)
  const { profile } = state

  const getProfile = useCallback(async () => {
    try {
      // 如果有 profile or 没有 token 都不发请求
      if (profile || !token) return false

      const res = await getCurrentProfile()

      dispatch({ type: GET_PROFILE, payload: res.data.profile })
    } catch (err) {
      Notification.error({
        title: 'info',
        description: err.response.data.msg
      })
    }
  }, [profile, token])

  const getProfiles = async () => {
    try {
      const res = await getAllProfiles()
      const { profiles } = res.data

      dispatch({ type: GET_PROFILES, payload: profiles })
    } catch (err) {
      Notification.error({
        title: 'info',
        description: err.response.data.msg
      })
    }
  }

  useEffect(() => {
    getProfiles()
    getProfile()
  }, [getProfile])

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileProvider }
