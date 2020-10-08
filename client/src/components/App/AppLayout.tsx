import { getCurrentUser } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { Alert } from 'rsuite'
import AppRouter from './AppRouter'

const AppLayout: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext)

  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUser()
      const { user } = response.data

      dispatch({ type: 'USER_LOADED', payload: { user } })
    } catch (err) {
      Alert.error(err.message)

      dispatch({ type: 'AUTH_ERROR' })
    }
  }, [dispatch])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const { user, token } = state

    if (!user && token) {
      loadUser()
    }
  }, [state, loadUser])

  return <AppRouter />
}

export { AppLayout }
