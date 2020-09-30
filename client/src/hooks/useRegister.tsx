import { register } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useRef, useState } from 'react'

type IUser = {
  email: string
  username: string
  password: string
  confirmPassword: string
  isSubmitting: boolean
}

function RegisterPage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isSubmitting: false
  })
  const { dispatch } = useContext(AuthContext)
  const form = useRef<HTMLFormElement>(null)

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    if (form.current !== null) form.current.cleanErrors()

    setUser({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      isSubmitting: false
    })
  }

  const handleRegister = async () => {
    try {
      if (form.current !== null && !form.current.check()) return false

      setUser({ ...user, isSubmitting: true })

      const { email, username, password } = user
      const newUser = { email, username, password }
      const response = await register(newUser)

      dispatch({ type: 'REGISTER', payload: response.data })
      onReset()
    } catch (err) {
      console.error(`Error: ${err.message}`)
    } finally {
      setUser({ ...user, isSubmitting: false })
    }
  }

  return { form, user, onChange, onReset, handleRegister }
}

export { RegisterPage }
