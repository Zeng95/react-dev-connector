import { getCurrentUser, login, register } from 'api/users'
import { USER_LOADED, LOGIN, REGISTER, LOGOUT, AUTH_ERROR } from 'context/types'
import { createContext } from 'react'

interface IUser {
  _id: string
  avatar: string
  email: string
  username: string
}

interface IUserLoginProps {
  email: string
  password: string
}

interface IUserRegisterProps {
  email: string
  username: string
  password: string
}

interface IError {
  msg: string
  status: string
}

interface IContextProps {
  state: {
    token: string | null
    user: IUser | null
    error: IError | null
    isAuthenticated: boolean
    loading: boolean
  }
  actions: {
    userLoad: () => any
    userLogin: (formData: IUserLoginProps) => any
    userRegister: (formData: IUserRegisterProps) => any
    userLogout: () => any
  }
}

const initialAuth = {
  state: {
    token: localStorage.getItem('auth-token'),
    user: null,
    error: null,
    isAuthenticated: false,
    loading: true
  },
  actions: {
    userLoad: () => {},
    userLogin: () => {},
    userRegister: () => {},
    userLogout: () => {}
  }
}

const AuthContext = createContext<IContextProps>(initialAuth)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: authState } = state

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        state: {
          ...authState,
          user: payload,
          isAuthenticated: true,
          loading: false
        }
      }
    case LOGIN:
    case REGISTER:
      localStorage.setItem('auth-token', payload.token)
      return {
        ...state,
        state: {
          ...authState,
          ...payload,
          isAuthenticated: true,
          loading: false
        }
      }
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('auth-token')
      return {
        ...state,
        state: {
          error: payload,
          user: null,
          token: null,
          isAuthenticated: false,
          loading: true
        }
      }
    default:
      return state
  }
}

const actions = (dispatch: React.Dispatch<any>) => ({
  userLoad: async () => {
    try {
      const res = await getCurrentUser()

      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  userLogin: async (formData: IUserLoginProps) => {
    try {
      const res = await login(formData)

      dispatch({
        type: LOGIN,
        payload: { token: res.data.token }
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  userRegister: async (formData: IUserRegisterProps) => {
    try {
      const res = await register(formData)

      dispatch({
        type: REGISTER,
        payload: { token: res.data.token }
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status }
      })
    }
  },
  userLogout: () => {
    dispatch({ type: 'LOGOUT' })
  }
})

export { AuthContext, initialAuth, reducer, actions }
