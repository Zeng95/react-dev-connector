import { login, register, sendEmail } from 'api/auth'
import { getUser } from 'api/users'
import {
  AUTH_ERROR,
  LOGIN,
  LOGOUT,
  REGISTER,
  SHOW_BTN_LOADING,
  SHOW_DATA_LOADING,
  USER_LOADED
} from 'context/types'
import { createContext } from 'react'

interface User {
  _id: string
  email: string
  avatar: string
  username: string
}

interface LoginFormData {
  email: string
  password: string
}

interface RegisterFormData {
  email: string
  username: string
  password: string
}

interface InitialState {
  state: {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    dataLoading: boolean
    submitLoading: boolean
  }
  actions: {
    userLoad: () => any
    userLogin: (formData: LoginFormData) => any
    userRegister: (formData: RegisterFormData) => any
    userSendEmail: (email: string) => any
    userLogout: () => any
  }
}

const initialState = {
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
    userSendEmail: () => {},
    userLogout: () => {}
  }
}

const AuthContext = createContext<InitialState>(initialState)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: authState } = state

  switch (type) {
    case SHOW_DATA_LOADING:
      return {
        ...state,
        state: {
          ...authState,
          dataLoading: true
        }
      }
    case SHOW_BTN_LOADING:
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
          user: payload.user,
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
        type: SHOW_DATA_LOADING
      })

      // 发送请求
      const res = await getUser()

      dispatch({
        type: USER_LOADED,
        payload: { user: res.data.user }
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  },
  userLogin: (formData: LoginFormData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        // 发送请求
        const res = await login(formData)

        dispatch({
          type: LOGIN,
          payload: { token: res.data.token }
        })

        // 请求成功
        resolve('success')
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        })

        // 请求失败
        reject('error')
      }
    })
  },
  userRegister: (formData: RegisterFormData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        const res = await register(formData)

        dispatch({
          type: REGISTER,
          payload: { token: res.data.token }
        })

        // 请求成功
        resolve('success')
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        })

        // 请求失败
        reject('error')
      }
    })
  },
  userSendEmail: (email: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        // 提交按钮显示加载中状态
        dispatch({
          type: SHOW_BTN_LOADING
        })

        // 发送请求
        await sendEmail(email)

        // 请求成功
        resolve('success')
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        })

        // 请求失败
        reject('error')
      }
    })
  },
  userLogout: () => {
    dispatch({
      type: LOGOUT
    })
  }
})

export { AuthContext, initialState, reducer, actions }
