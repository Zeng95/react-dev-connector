import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

type FormValue = Record<'email' | 'password', string>

interface User {
  email: string
  password: string
}

enum MessageType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}

function useLogin() {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userLogin } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Info)
  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<User>({ email: '', password: '' })

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

  const handleSubmit = async (from: { pathname: string }) => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    try {
      await userLogin(user)

      // 请求成功
      const successMsg = 'Logged in successfully.'

      setMessage(successMsg)
      setMessageType(MessageType.Success)

      history.replace(from)
    } catch (err) {
      // 请求失败
      const errorMsg = 'Incorrect username or password.'

      setMessage(errorMsg)
      setMessageType(MessageType.Error)
    } finally {
      // 显示消息框
      setShowMessage(true)
      // 清空表单
      handleReset()
    }
  }

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    from: any
  ) => {
    if (event.key === 'Enter' && !submitLoading) {
      handleSubmit(from)
    }
  }

  const handleReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setUser({ email: '', password: '' })
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
    handleMessageClose
  }
}

export { useLogin }
