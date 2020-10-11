import { getCurrentUser } from 'api/users'
import React, { useEffect, useReducer } from 'react'
import { Alert } from 'rsuite'
import { initialState, AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { user, token } = state

  const loadUser = async () => {
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
  }

  useEffect(() => {
    if (!user && token) {
      loadUser()
    }
  }, [user, token])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
