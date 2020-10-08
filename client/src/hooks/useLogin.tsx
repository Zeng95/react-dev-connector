import { login } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useRef, useState } from 'react'
import { Alert } from 'rsuite'

type IUser = {
  email: string
  password: string
  isSubmitting: boolean
}

function LoginPage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    isSubmitting: false
  })
  const auth = useContext(AuthContext)
  const { dispatch } = auth
  const formEl = useRef<HTMLFormElement>(null)

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

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onLogin()
    }
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({ email: '', password: '', isSubmitting: false })
  }

  return { formEl, user, onChange, onKeyUp, onReset, onLogin }
}

export { LoginPage }
