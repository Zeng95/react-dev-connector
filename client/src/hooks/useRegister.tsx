import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'

interface IUser {
  email: string
  username: string
  password: string
  confirmPassword: string
}

type EmailType = string[]

function RegisterPage() {
  const { actions } = useContext(AuthContext)
  const { userRegister } = actions

  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [email, setEmail] = useState<EmailType>([])
  const formEl = useRef<HTMLFormElement>(null)
  const emailSuggestions = [
    '@gmail.com',
    '@yahoo.com',
    '@sina.com.cn',
    '@qq.com',
    '@163.com'
  ]

  const onSubmit = () => {
    if (formEl.current !== null && !formEl.current.check()) return false

    const { email, username, password } = user
    const formData = { email, username, password }

    userRegister(formData)
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
