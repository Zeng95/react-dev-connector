import { register } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

type IUser = {
  email: string
  username: string
  password: string
  confirmPassword: string
  isSubmitting: boolean
}

function RegisterPage() {
  const history = useHistory()
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isSubmitting: false
  })
  const { state, dispatch } = useContext(AuthContext)
  const formEl = useRef<HTMLFormElement>(null)

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      isSubmitting: false
    })
  }

  const onRegister = async () => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setUser({ ...user, isSubmitting: true })

      const { email, username, password } = user
      const response = await register({ email, username, password })
      const { token, msg } = response.data

      dispatch({ type: 'REGISTER', payload: { token } })

      Alert.success(msg)
    } catch (err) {
      const { response, message } = err

      if (response) {
        const { errors, msg } = err.response.data

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

  return { formEl, user, onChange, onReset, onRegister }
}

export { RegisterPage }
