import React, { useState } from 'react'

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    console.log('submit')
  }

  return { user, onChange, handleSubmit }
}

export { RegisterPage }
