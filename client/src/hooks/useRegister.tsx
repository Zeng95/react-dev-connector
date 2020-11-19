import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { openAlert, openNotification } from 'utils'

interface IUser {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userRegister } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<IUser>({
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

  const onSubmit = () => {
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

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !submitLoading) {
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
      confirmPassword: ''
    })
  }

  return {
    formEl,
    user,
    email,
    emailSuggestions,
    onEmailChange,
    onChange,
    onSubmit,
    onKeyUp,
    onReset
  }
}

export { RegisterPage }
