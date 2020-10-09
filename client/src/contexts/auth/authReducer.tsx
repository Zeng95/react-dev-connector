type InitialStateType = {
  user: null
  token: string | null
  isAuthenticated: boolean
}

type ActionType =
  | { type: 'REGISTER'; payload: PayloadType }
  | { type: 'LOGIN'; payload: PayloadType }
  | { type: 'LOGOUT'; payload: PayloadType }
  | { type: 'USER_LOADED'; payload: PayloadType }
  | { type: 'AUTH_ERROR'; payload: PayloadType }

type PayloadType = {
  user: null
  token: string
}

const authReducer = (state: InitialStateType, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case 'USER_LOADED':
      return { ...state, ...payload, isAuthenticated: true }
    case 'REGISTER':
    case 'LOGIN':
      localStorage.setItem('auth-token', payload.token)
      return { ...state, ...payload, isAuthenticated: true }
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('auth-token')
      return { user: null, token: null, isAuthenticated: false }
    default:
      return state
  }
}

export { authReducer }
