import { login, register } from 'api/auth'
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
  userLogin: (formData: LoginProps) => {
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

        resolve()
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        })
        reject(err)
      }
    })
  },
  userLogout: () => {
    dispatch({
      type: LOGOUT
    })
  }
})

export { AuthContext, initialAuth, reducer, actions }
