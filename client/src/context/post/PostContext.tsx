import {
  createPost,
  deletePost,
  getPostById,
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
  SHOW_BTN_LOADING,
  SHOW_DATA_LOADING,
  UPDATE_LIKES
} from 'context/types'
import { createContext } from 'react'
import { openAlert, openNotification } from 'utils'

interface Like {
  _id: string
  user: string
  date: string
}

interface Comment {
  _id: string
  user: string
  text: string
  avatar: string
  username: string
  date: string
}

interface Post {
  _id: string
  user: string
  title: string
  content: string
  avatar: string
  username: string
  likes: Like[]
  comments: Comment[]
  date: string
}

interface InitialState {
  state: {
    post: Post | null
    posts: Post[]
    dataLoading: boolean
    submitLoading: boolean
  }
  actions: {
    getAllPosts: () => any
    getSinglePost: (postId: string) => any
    createUserPost: (post: any) => any
    deleteUserPost: (postId: string) => any
    addLike: (postId: string) => any
    removeLike: (postId: string) => any
  }
}

const initialState = {
  state: {
    post: null,
    posts: [],
    dataLoading: true,
    submitLoading: false
  },
  actions: {
    getAllPosts: () => {},
    getSinglePost: () => {},
    createUserPost: () => {},
    deleteUserPost: () => {},
    addLike: () => {},
    removeLike: () => {}
  }
}

const PostContext = createContext<InitialState>(initialState)

const reducer = (state: any, action: any) => {
  const { type, payload } = action
  const { state: postState } = state

  switch (type) {
    case SHOW_DATA_LOADING:
      return {
        ...state,
        state: {
          ...postState,
          dataLoading: true
        }
      }
    case SHOW_BTN_LOADING:
      return {
        ...state,
        state: {
          ...postState,
          submitLoading: true
        }
      }
    case GET_POSTS:
      return {
        ...state,
        state: {
          ...postState,
          posts: payload.posts,
          dataLoading: false
        }
      }
    case GET_POST:
      return {
        ...state,
        state: {
          ...postState,
          post: payload.post,
          dataLoading: false
        }
      }
    case CREATE_POST:
      return {
        ...state,
        state: {
          ...postState,
          posts: [...postState.posts, payload.post],
          dataLoading: false,
          submitLoading: false
        }
      }
    case DELETE_POST:
      return {
        ...state,
        state: {
          ...postState,
          posts: postState.posts.filter((item: Post) => {
            return item['_id'] !== payload.postId
          })
        }
      }
    case UPDATE_LIKES:
      return {
        ...state,
        state: {
          ...postState,
          posts: postState.posts.map((item: Post) => {
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
          dataLoading: false
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
        type: SHOW_DATA_LOADING
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
  getSinglePost: async (postId: string) => {
    try {
      dispatch({
        type: SHOW_DATA_LOADING
      })

      const res = await getPostById(postId)

      dispatch({
        type: GET_POST,
        payload: { post: res.data.post }
      })
    } catch (err) {
      dispatch({
        type: POST_ERROR
      })
    }
  },
  createUserPost: async (post: Post) => {
    try {
      // 提交按钮显示加载中状态
      dispatch({
        type: SHOW_BTN_LOADING
      })

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
  deleteUserPost: async (postId: string) => {
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
