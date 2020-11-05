import { Alert, Notification } from 'rsuite'

const setAuthToken = () => {
  const token = localStorage.getItem('auth-token')
  return token ? { 'x-auth-token': token } : {}
}

const openAlert = (funcName, description) => {
  Alert[funcName](description, 3000)
}

const openNotification = (funcName, description) => {
  Notification[funcName]({ title: funcName, description })
}

export { setAuthToken, openAlert, openNotification }
