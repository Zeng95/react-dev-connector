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

const checkUsername = (username: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register_check/username`, { username })
}

const checkEmail = (email: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register_check/email`, { email })
}

const login = (formData: LoginData): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/login`, formData)
}

const register = (formData: RegisterData): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/register`, formData)
}

const sendEmail = (email: string): Promise<AxiosResponse<any>> => {
  return httpClient.post(`${END_POINT}/forgot`, { email })
}

export { checkUsername, checkEmail, login, register, sendEmail }
