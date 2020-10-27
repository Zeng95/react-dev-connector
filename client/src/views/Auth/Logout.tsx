import { AuthContext } from 'context/auth/AuthContext'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout: React.FC = () => {
  const history = useHistory()

  const { state, actions } = useContext(AuthContext)
  const { userLogout } = actions

  useEffect(() => {
    userLogout()

    if (!state.isAuthenticated) {
      history.push('/')
    }
  }, [state, history])

  return null
}

export { Logout }
