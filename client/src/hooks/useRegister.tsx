import { register } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import { useContext, useState } from 'react'
import { Schema } from 'rsuite'

type IUser = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const { dispatch } = useContext(AuthContext)
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const { StringType } = Schema.Types
  const userModel = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    username: StringType().isRequired('This field is required.'),
    password: StringType()
      .minLength(6, 'Minimum 6 characters required')
      .isRequired('This field is required.'),
    confirmPassword: StringType()
      .addRule((value, data) => {
        if (value !== data.password) return false

        return true
      }, 'The two passwords do not match')
      .isRequired('This field is required.')
  })

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const onReset = () => {
    setUser({ email: '', username: '', password: '', confirmPassword: '' })
  }

  const handleRegister = async () => {
    try {
      const { email, username, password } = user
      const newUser = { email, username, password }
      const response = await register(newUser)

      dispatch({ type: 'REGISTER', payload: response.data })
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  }

  return { user, userModel, onChange, onReset, handleRegister }
}

export { RegisterPage }
