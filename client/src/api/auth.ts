import { AxiosResponse } from 'axios'
import httpClient from './httpClient'

const END_POINT = '/auth'

interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  email: string
  username: string
  password: string
}

// Check if username already exists
const checkUsername = (username: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register_check/username`, { username })
}

// Check if email already exists
const checkEmail = (email: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register_check/email`, { email })
}

// Send recovery email
const sendEmail = (email: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/forgot`, { email })
}

// Login user
const login = (formData: LoginData): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/login`, formData)
}

// Register user
const register = (formData: RegisterData): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register`, formData)
}

export { checkUsername, checkEmail, sendEmail, login, register }
