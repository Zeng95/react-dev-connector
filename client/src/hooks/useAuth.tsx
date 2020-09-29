import { useEffect, useState } from 'react'
import { getCurrentUser } from 'api/users'

const useAuth = () => {
  const [userData, setUserData] = useState({
    user: null,
    isAuthenticated: null
  })

  useEffect(() => {
    checkAuthenticated()
  }, [])

  const checkAuthenticated = async () => {
    const response = await getCurrentUser()
    console.log(1, response.data)
  }

  return { userData, setUserData }
}

export { useAuth }
