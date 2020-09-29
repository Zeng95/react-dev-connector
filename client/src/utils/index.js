export const setAuthToken = () => {
  const token = localStorage.getItem('auth-token')
  return token ? { 'x-auth-token': token } : {}
}
