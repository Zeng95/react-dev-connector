import { login } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useState } from 'react'
import { Schema } from 'rsuite'

type IUser = {
  email: string
  password: string
}

function LoginPage() {
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState<IUser>({ email: '', password: '' })

  const { StringType } = Schema.Types
  const userModel = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    password: StringType()
      .minLength(6, 'Minimum 6 characters required')
      .isRequired('This field is required.')
  })

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    setUser({ email: '', password: '' })
  }

  const handleLogin = async () => {
    try {
      const { email, password } = user
      const newUser = { email, password }
      const response = await login(newUser)

      dispatch({ type: 'LOGIN', payload: response.data })
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  }

  return { user, userModel, onChange, onReset, handleLogin }
}

export { LoginPage }
