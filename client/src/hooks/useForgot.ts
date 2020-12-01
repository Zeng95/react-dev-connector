import { AuthContext } from 'context/auth/AuthContext'
import { useContext, useRef, useState } from 'react'

type FormValue = Record<'email', string>

interface User {
  email: string
}

enum MessageType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}

function useForgot() {
  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state
  const { userSendEmail } = auth.actions

  const formEl = useRef<HTMLFormElement>(null)

  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messageType, setMessageType] = useState<MessageType>(MessageType.Info)
  const [email, setEmail] = useState<string[]>([])
  const [user, setUser] = useState<User>({ email: '' })

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
      await userSendEmail(user.email)

      // 请求成功
      const successMsg =
        'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'

      setMessage(successMsg)
      setMessageType(MessageType.Success)
    } catch (err) {
      // 请求失败
      const errorMsg =
        'That address is not associated with a personal user account.'

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

    setUser({ email: '' })
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

export { useForgot }
