import { register } from 'api/users'
import { AuthContext } from 'contexts/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { Alert } from 'rsuite'

type IUser = {
  email: string
  username: string
  password: string
  confirmPassword: string
  isSubmitting: boolean
}

function RegisterPage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isSubmitting: false
  })
  const { dispatch } = useContext(AuthContext)
  const formEl = useRef<HTMLFormElement>(null)

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

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onRegister()
    }
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

  return { formEl, user, onChange, onKeyUp, onReset, onRegister }
}

export { RegisterPage }
