import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout: React.FC = () => {
  const history = useHistory()

  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext.state
  const { userLogout } = authContext.actions

  const profileContext = useContext(ProfileContext)
  const { clearCurrentProfile } = profileContext.actions

  useEffect(() => {
    clearCurrentProfile()
    userLogout()

    if (!isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history, clearCurrentProfile, userLogout])

  return null
}

export { Logout }
