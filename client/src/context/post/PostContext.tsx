import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  unlikePost
} from 'api/posts'
import {
  CREATE_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  SHOW_LOADING,
  UPDATE_LIKES
} from 'context/types'
import { createContext } from 'react'
import { openAlert, openNotification } from 'utils'

interface ILike {
  _id: string
  user: string
  date: string
}

interface IComment {
  _id: string
  user: string
  text: string
  avatar: string
  username: string
  date: string
}

interface IPost {
  _id: string
  user: string
  title: string
  content: string
  avatar: string
  username: string
  likes: ILike[]
  comments: IComment[]
  date: string
}

interface InitialStateType {
  state: {
    post: IPost | null
    posts: IPost[]
    pageLoading: boolean
  }
  actions: {
    getAllPosts: () => any
    getSinglePost: () => any
    createSinglePost: (post: any) => any
    deleteSinglePost: (postId: string) => any
    addLike: (postId: string) => any
    removeLike: (postId: string) => any
  }
}

const initialState = {
  state: {
    post: null,
    posts: [],
    pageLoading: true
  },
  actions: {
    getAllPosts: () => {},
    getSinglePost: () => {},
    createSinglePost: () => {},
    deleteSinglePost: () => {},
    addLike: () => {},
    removeLike: () => {}
  }
}

const PostContext = createContext<InitialStateType>(initialState)

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
          posts: payload.posts,
          pageLoading: false
        }
      }
    case GET_POST:
      return {
        ...state,
        state: {
          ...postState,
          post: payload.post,
          pageLoading: false
        }
      }
    case CREATE_POST:
      return {
        ...state,
        state: {
          ...postState,
          posts: [...postState.posts, payload.post],
          pageLoading: false
        }
      }
    case DELETE_POST:
      return {
        ...state,
        state: {
          ...postState,
          posts: postState.posts.filter((item: IPost) => {
            return item['_id'] !== payload.postId
          })
        }
      }
    case UPDATE_LIKES:
      return {
        ...state,
        state: {
          ...postState,
          posts: postState.posts.map((item: IPost) => {
            return item['_id'] === payload.postId ? payload.post : item
          })
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
        payload: { posts: res.data.posts }
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
        payload: { post: res.data.post }
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR
      })
    }
  },
  createSinglePost: async (post: IPost) => {
    try {
      const res = await createPost(post)

      dispatch({
        type: CREATE_POST,
        payload: { post: res.data.post }
      })

      openNotification('success', 'Success', res.data.msg)
    } catch (err) {
      openNotification('error', 'Error', err.response.data.msg)
    }
  },
  deleteSinglePost: async (postId: string) => {
    try {
      const res = await deletePost(postId)

      dispatch({
        type: DELETE_POST,
        payload: { postId }
      })

      openAlert('success', res.data.msg)
    } catch (err) {
      openAlert('error', err.response.data.msg)
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
      openAlert('warning', err.response.data.msg)
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
      openAlert('warning', err.response.data.msg)
    }
  }
})

export { PostContext, initialState, reducer, actions }
