import { AuthContext } from 'contexts/auth/AuthContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout: React.FC = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(AuthContext)

  const onLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [dispatch])

  useEffect(() => {
    onLogout()

    if (!state.isAuthenticated) {
      history.push('/')
    }
  }, [state, history, onLogout])

  return null
}

export { Logout }
