import { Alert, Notification } from 'rsuite'

export const setAuthToken = () => {
  const token = localStorage.getItem('auth-token')
  return token ? { 'x-auth-token': token } : {}
}

export const openAlert = (funcName, description) => {
  Alert[funcName](description, 3000)
}

export const openNotification = (funcName, description) => {
  Notification[funcName]({ title: funcName, description })
}
