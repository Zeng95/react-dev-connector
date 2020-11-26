import { checkEmail, checkUsername } from 'api/auth'
import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { openAlert, openNotification } from 'utils'

interface User {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function useRegister() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userRegister } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const emailSuggestions = [
    '@gmail.com',
    '@foxmail.com',
    '@yahoo.com',
    '@sina.com',
    '@sina.cn',
    '@qq.com',
    '@126.com',
    '@163.com'
  ]

  const handleSubmit = () => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    const { email, username, password } = user

    userRegister({ email, username, password })
      .then(() => {
        history.push('/dashboard')
      })
      .catch((err: any) => {
        const { errors, msg } = err.response.data

        if (errors) {
          errors.forEach((error: any) => openAlert('error', error.msg))
        } else {
          openNotification('error', msg)
        }
      })
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !submitLoading) {
      handleSubmit()
    }
  }

  const handleReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleChange = (formValue: any) => {
    setUser(formValue)
  }

  const handleEmailChange = (value: any) => {
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

  const asyncCheckUsername = (username: string) => {
    return new Promise<boolean>(async resolve => {
      let result = true

      try {
        await checkUsername({ username: username.trim() })
      } catch (err) {
        result = false
      }

      resolve(result)
    })
  }

  const asyncCheckEmail = (email: string) => {
    return new Promise<boolean>(async resolve => {
      let result = true

      try {
        await checkEmail({ email })
      } catch (err) {
        result = false
      }

      resolve(result)
    })
  }

  return {
    formEl,
    user,
    email,
    emailSuggestions,
    handleEmailChange,
    handleChange,
    handleSubmit,
    handleKeyUp,
    handleReset,
    asyncCheckUsername,
    asyncCheckEmail
  }
}

export { useRegister }
