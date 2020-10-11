import { register } from 'api/users'
import { AuthContext } from 'contexts/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { Alert } from 'rsuite'

type UserType = {
  email: string
  username: string
  password: string
  confirmPassword: string
  isSubmitting: boolean
}

type EmailType = string[]

function RegisterPage() {
  const [user, setUser] = useState<UserType>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isSubmitting: false
  })
  const [email, setEmail] = useState<EmailType>([])
  const formEl = useRef<HTMLFormElement>(null)
  const { dispatch } = useContext(AuthContext)
  const emailSuggestions = [
    '@gmail.com',
    '@yahoo.com',
    '@sina.com.cn',
    '@qq.com',
    '@163.com'
  ]

  const onSubmit = async () => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setUser({ ...user, isSubmitting: true })

      const { email, username, password } = user
      const response = await register({ email, username, password })
      const { token } = response.data

      dispatch({ type: 'REGISTER', payload: { token } })
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

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onEmailChange = (value: any) => {
    const at = value.match(/@[\S]*/)
    const nextData = at
      ? emailSuggestions
          .filter(item => item.indexOf(at[0]) >= 0)
          .map(item => {
            return `${value}${item.replace(at[0], '')}`
          })
      : emailSuggestions.map(item => `${value}${item}`)

    setEmail(nextData)

    if (nextData.length === 1) {
      setUser({ ...user, email: nextData[0] })
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

  return {
    formEl,
    user,
    email,
    emailSuggestions,
    onEmailChange,
    onSubmit,
    onChange,
    onKeyUp,
    onReset
  }
}

export { RegisterPage }
