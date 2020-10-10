import { getCurrentUser } from 'api/users'
import React, { useCallback, useEffect, useReducer } from 'react'
import { Alert } from 'rsuite'
import { AuthContext, initialState } from './AuthContext'
import { authReducer } from './authReducer'

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUser()
      const { user } = response.data

      dispatch({ type: 'USER_LOADED', payload: { user } })
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
  }, [dispatch])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const { user, token } = state

    if (!user && token) {
      loadUser()
    }
  }, [state, loadUser])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
