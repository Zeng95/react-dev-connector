import { getProfile } from 'api/profiles'
import { ProfileContext } from 'context/ProfileContext'
import { useContext, useEffect } from 'react'
import { Alert } from 'rsuite'

function DashboardPage() {
  const { dispatch } = useContext(ProfileContext)

  // Get the authenticated users profile
  const getCurrentProfile = async () => {
    try {
      const response = await getProfile()
      const { msg, profile } = response.data

      Alert.success(msg)

      dispatch({ type: 'GET_PROFILE', payload: profile })
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
    }
  }

  useEffect(() => {
    getCurrentProfile()
  }, [])

  return { getCurrentProfile }
}

export { DashboardPage }
