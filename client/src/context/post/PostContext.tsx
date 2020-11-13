import { getPosts, likePost, unlikePost } from 'api/posts'
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  SHOW_LOADING,
  UPDATE_LIKES
} from 'context/types'
import { createContext } from 'react'

const initialState = {
  state: {
    post: null,
    posts: [],
    pageLoading: true
  },
  actions: {
    getAllPosts: () => {},
    getSinglePost: () => {}
  }
}

const PostContext = createContext(initialState)

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
      dispatch({
        type: POST_ERROR
      })
    }
  },
  getSinglePost: async () => {
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
      dispatch({
        type: POST_ERROR
      })
    }
  },
  addLike: async (postId: string) => {
    try {
      const res = await likePost(postId)

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, post: res.data.post }
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR
      })
    }
  },
  removeLike: async (postId: string) => {
    try {
      const res = await unlikePost(postId)

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, post: res.data.post }
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR
      })
    }
  }
})

export { PostContext, initialState, reducer, actions }
