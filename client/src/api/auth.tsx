import httpClient from './httpClient'

const END_POINT = '/auth'

interface checkUsernameProps {
  username: string
}

interface checkEmailProps {
  email: string
}

interface loginProps {
  email: string
  password: string
}

interface registerProps {
  email: string
  username: string
  password: string
  confirmPassword: string
}

const checkUsername = (formData: checkUsernameProps) => {
  return httpClient.post(`${END_POINT}/register_check/username`, formData)
}

const checkEmail = (formData: checkEmailProps) => {
  return httpClient.post(`${END_POINT}/register_check/email`, formData)
}

const login = (formData: loginProps) => {
  return httpClient.post(`${END_POINT}/login`, formData)
}

const register = (formData: registerProps) => {
  return httpClient.post(`${END_POINT}/register`, formData)
}

export { checkUsername, checkEmail, login, register }
