import { checkEmail, checkUsername } from 'api/auth'
import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { openAlert, openNotification } from 'utils'

interface User {
  email: string
}

function useRegister() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userRegister } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<User>({
    email: ''
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
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !submitLoading) {
      handleSubmit()
    }
  }

  const handleReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({
      email: ''
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

  return {
    formEl,
    user,
    email,
    emailSuggestions,
    handleEmailChange,
    handleChange,
    handleSubmit,
    handleKeyUp,
    handleReset
  }
}

export { useRegister }
