import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { openAlert, openNotification } from 'utils'

interface IUser {
  email: string
  password: string
}

function LoginPage() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userLogin } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<IUser>({ email: '', password: '' })

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

  const onSubmit = (from: any) => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    userLogin(user)
      .then(() => {
        history.replace(from)
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

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, from: any) => {
    if (event.key === 'Enter' && !submitLoading) {
      onSubmit(from)
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

    setUser({ email: '', password: '' })
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

export { LoginPage }
