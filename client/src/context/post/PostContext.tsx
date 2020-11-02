import { GET_POST, GET_POSTS, POST_ERROR } from 'context/types'
import { createContext } from 'react'

const initialPost = {
  state: {
    post: null,
    posts: [],
    pageLoading: true
  },
  actions: {}
}

const PostContext = createContext(initialPost)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: postState } = state

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        state: {
          ...postState,
          posts: payload,
          pageLoading: false
        }
      }
    case GET_POST:
      return {
        ...state,
        state: {
          ...postState,
          post: payload,
          pageLoading: false
        }
      }
    case POST_ERROR:
      return {
        ...state,
        state: {
          ...postState,
          post: null,
          posts: [],
          pageLoading: false
        }
      }
    default:
      return state
  }
}

const actions = (dispatch: React.Dispatch<any>) => ({})

export { PostContext, initialProfile, reducer, actions }
