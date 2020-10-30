import { getCurrentUser, login, register } from 'api/users'
import {
  AUTH_ERROR,
  AUTH_SUBMIT,
  LOGIN,
  LOGOUT,
  REGISTER,
  SHOW_LOADING,
  USER_LOADED
} from 'context/types'
import { createContext } from 'react'
import { openAlert, openNotification } from 'utils'

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

interface IContextProps {
  state: {
    token: string | null
    user: IUser | null
    isAuthenticated: boolean
    pageLoading: boolean
    submitLoading: boolean
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
    isAuthenticated: false,
    pageLoading: true,
    submitLoading: false
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
    case SHOW_LOADING:
      return {
        ...state,
        state: {
          ...authState,
          pageLoading: true
        }
      }
    case AUTH_SUBMIT:
      return {
        ...state,
        state: {
          ...authState,
          submitLoading: true
        }
      }
    case USER_LOADED:
      return {
        ...state,
        state: {
          ...authState,
          user: payload,
          isAuthenticated: true,
          pageLoading: false
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
          submitLoading: false
        }
      }
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem('auth-token')
      return {
        ...state,
        state: {
          ...authState,
          user: null,
          token: null,
          isAuthenticated: false,
          pageLoading: false,
          submitLoading: false
        }
      }
    default:
      return state
  }
}

const actions = (dispatch: React.Dispatch<any>) => ({
  userLoad: async () => {
    try {
      dispatch({
        type: SHOW_LOADING
      })

      // 发送请求
      const res = await getCurrentUser()

      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      })
    } catch (err) {
      const { msg } = err.response.data
      openNotification('error', msg)

      dispatch({
        type: AUTH_ERROR
      })
    }
  },
  userLogin: async (formData: IUserLoginProps) => {
    try {
      // 提交按钮显示加载中状态
      dispatch({
        type: AUTH_SUBMIT
      })

      // 发送请求
      const res = await login(formData)

      dispatch({
        type: LOGIN,
        payload: { token: res.data.token }
      })
    } catch (err) {
      const { errors, msg } = err.response.data

      if (errors) {
        errors.forEach((error: any) => openAlert('error', error.msg))
      } else {
        openNotification('error', msg)
      }

      dispatch({
        type: AUTH_ERROR
      })
    }
  },
  userRegister: async (formData: IUserRegisterProps) => {
    try {
      // 提交按钮显示加载中状态
      dispatch({
        type: AUTH_SUBMIT
      })

      const res = await register(formData)

      dispatch({
        type: REGISTER,
        payload: { token: res.data.token }
      })
    } catch (err) {
      const { errors, msg } = err.response.data

      if (errors) {
        errors.forEach((error: any) => openAlert('error', error.msg))
      } else {
        openNotification('error', msg)
      }

      dispatch({
        type: AUTH_ERROR
      })
    }
  },
  userLogout: () => {
    dispatch({ type: 'LOGOUT' })
  }
})

export { AuthContext, initialAuth, reducer, actions }
