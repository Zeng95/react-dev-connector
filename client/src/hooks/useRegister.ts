import { checkEmail, checkUsername } from 'api/auth'
import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

type FormValue = Record<
  'email' | 'username' | 'password' | 'confirmPassword',
  string
>

interface User {
  email: string
  username: string
  password: string
  confirmPassword: string
}

enum MessageType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}

function useRegister() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userRegister } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Info)
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

  const handleSubmit = async () => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    try {
      const { email, username, password } = user

      await userRegister({ email, username, password })

      // 请求成功
      const successMsg = 'Signed up successfully'

      setMessage(successMsg)
      setMessageType(MessageType.Success)

      history.push('/dashboard')
    } catch (err) {
      // 请求失败
      const errorMsg = 'Signed up unsuccessfully'

      setMessage(errorMsg)
      setMessageType(MessageType.Error)
    } finally {
      // 显示消息框
      setShowMessage(true)
      // 清空表单
      handleReset()
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
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleChange = (formValue: FormValue) => {
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

  const handleMessageClose = () => {
    setShowMessage(false)
  }

  const asyncCheckUsername = (username: string) => {
    return new Promise<boolean>(async resolve => {
      let result = true

      try {
        await checkUsername(username.trim())
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
        await checkEmail(email)
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
    message,
    messageType,
    showMessage,
    handleSubmit,
    handleKeyUp,
    handleReset,
    handleChange,
    handleEmailChange,
    handleMessageClose,
    asyncCheckUsername,
    asyncCheckEmail
  }
}

export { useRegister }
