import { getPosts } from 'api/posts'
import { initialProfile } from 'context/profile/ProfileContext'
import { GET_POST, GET_POSTS, POST_ERROR, SHOW_LOADING } from 'context/types'
import { createContext } from 'react'
import { openAlert, openNotification } from 'utils'

const initialPost = {
  state: {
    post: null,
    posts: [],
    pageLoading: true
  },
  actions: {
    getAllPosts: () => {}
  }
}

const PostContext = createContext(initialPost)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: postState } = state

  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        state: {
          ...postState,
          pageLoading: true
        }
      }
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

const actions = (dispatch: React.Dispatch<any>) => ({
  getAllPosts: async () => {
    try {
      dispatch({
        type: SHOW_LOADING
      })

      const res = await getPosts()

      dispatch({
        type: GET_POSTS,
        payload: res.data.posts
      })
    } catch (err) {
      const { errors, msg } = err.response.data

      if (errors) {
        errors.forEach((error: any) => openAlert('error', error.msg))
      } else {
        openNotification('error', msg)
      }

      dispatch({
        type: POST_ERROR
      })
    }
  }
})

export { PostContext, initialProfile, reducer, actions }
