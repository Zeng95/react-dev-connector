import { login } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

type IUser = {
  email: string
  password: string
  isSubmitting: boolean
}

function LoginPage() {
  const history = useHistory()
  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    isSubmitting: false
  })
  const { state, dispatch } = useContext(AuthContext)
  const formEl = useRef<HTMLFormElement>(null)

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({ email: '', password: '', isSubmitting: false })
  }

  const onLogin = async () => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setUser({ ...user, isSubmitting: true })

      const { email, password } = user
      const response = await login({ email, password })
      const { token, msg } = response.data

      Alert.success(msg)

      dispatch({ type: 'LOGIN', payload: { token } })
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
    } finally {
      setUser({ ...user, isSubmitting: false })
    }
  }

  useEffect(() => {
    const { isAuthenticated, token } = state

    if (isAuthenticated || token) {
      history.push('/dashboard')
    }
  }, [state, history])

  return { formEl, user, onChange, onReset, onLogin }
}

export { LoginPage }
