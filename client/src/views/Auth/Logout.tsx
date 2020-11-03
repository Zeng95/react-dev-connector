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
  const { clearProfile } = profileContext.actions

  useEffect(() => {
    clearProfile()
    userLogout()

    if (!isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated, history, clearProfile, userLogout])

  return null
}

export { Logout }
