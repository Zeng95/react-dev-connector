import { useState } from 'react'

type IFormData = {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function useRegister() {
  const [registerData, setRegisterData] = useState<IFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = (formData: IFormData) => {
    setRegisterData(formData)
  }

  return { registerData, handleLogin }
}

export { useRegister }
