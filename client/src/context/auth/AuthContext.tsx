import { getUser, login, register } from 'api/users'
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
  email: string
  avatar: string
  username: string
}

interface LoginProps {
  email: string
  password: string
}

interface RegisterProps {
  email: string
  username: string
  password: string
}

interface InitialStateType {
  state: {
    token: string | null
    user: IUser | null
    isAuthenticated: boolean
    dataLoading: boolean
    submitLoading: boolean
  }
  actions: {
    userLoad: () => any
    userLogin: (formData: LoginProps) => any
    userRegister: (formData: RegisterProps) => any
    userLogout: () => any
  }
}

const initialAuth = {
  state: {
    token: localStorage.getItem('auth-token'),
    user: null,
    isAuthenticated: false,
    dataLoading: true,
    submitLoading: false
  },
  actions: {
    userLoad: () => {},
    userLogin: () => {},
    userRegister: () => {},
    userLogout: () => {}
  }
}

const AuthContext = createContext<InitialStateType>(initialAuth)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: authState } = state

  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        state: {
          ...authState,
          dataLoading: true
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
          dataLoading: false
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
          dataLoading: false,
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
      const res = await getUser()

      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  },
  userLogin: (formData: LoginProps) => {
    return new Promise(async (resolve, reject) => {
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

        resolve()
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        })

        reject(err)
      }
    })
  },
  userRegister: async (formData: RegisterProps) => {
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
    dispatch({
      type: LOGOUT
    })
  }
})

export { AuthContext, initialAuth, reducer, actions }
