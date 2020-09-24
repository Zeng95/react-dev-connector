import { useState } from 'react'

interface IUser {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const [user, setUser] = useState<IUser>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const onChange = (formValue: any) => {
    setUser(formValue)
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return { user, onChange, handleSubmit }
}

export { RegisterPage }
