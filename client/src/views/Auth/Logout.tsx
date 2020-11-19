import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout: React.FC = () => {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { isAuthenticated } = auth.state
  const { userLogout } = auth.actions

  const profileContext = useContext(ProfileContext)
  const { clearCurrentProfile } = profileContext.actions

  useEffect(() => {
    clearCurrentProfile()
    userLogout()
  }, [isAuthenticated, history, clearCurrentProfile, userLogout])

  return null
}

export { Logout }
