import { login } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useRef, useState } from 'react'

type IUser = {
  email: string
  password: string
  isSubmitting: boolean
}

function LoginPage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    isSubmitting: false
  })
  const { dispatch } = useContext(AuthContext)
  const form = useRef<HTMLFormElement>(null)

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    if (form.current !== null) form.current.cleanErrors()

    setUser({ email: '', password: '', isSubmitting: false })
  }

  const handleLogin = async () => {
    try {
      if (form.current !== null && !form.current.check()) return false

      setUser({ ...user, isSubmitting: true })

      const { email, password } = user
      const newUser = { email, password }
      const response = await login(newUser)

      dispatch({ type: 'LOGIN', payload: response.data })
      onReset()
    } catch (err) {
      console.error(`Error: ${err.message}`)
    } finally {
      setUser({ ...user, isSubmitting: false })
    }
  }

  return { form, user, onChange, onReset, handleLogin }
}

export { LoginPage }
