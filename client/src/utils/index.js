import { Alert, Notification } from 'rsuite'

const setAuthToken = () => {
  const token = localStorage.getItem('auth-token')
  return token ? { 'x-auth-token': token } : {}
}

const removeChar = str => {
  return str.trim().replace(/\s+/g, '-').toLowerCase()
}

const isObject = value => {
  return typeof value === 'object' && value !== null
}

const openAlert = (funcName, content, duration = 2000) => {
  Alert[funcName](content, duration)
}

const openNotification = (funcName, title, description = 2000) => {
  Notification[funcName]({ title, description })
}

export { setAuthToken, removeChar, isObject, openAlert, openNotification }
