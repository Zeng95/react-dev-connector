import { setAuthToken } from 'utils'
import httpClient from './httpClient'

// "Articles" are all the posts that users create. They can be a blog post, a discussion question, a help thread etc.
// but is referred to as article within the code.
const END_POINT = '/articles'

const getPosts = () => {
  return httpClient.get(`${END_POINT}/all`)
}

const getPostById = (postId: string) => {
  return httpClient.get(`${END_POINT}/${postId}`)
}

const createPost = (post: any) => {
  return httpClient.post(`${END_POINT}`, post, {
    headers: setAuthToken()
  })
}

const likePost = (postId: string) => {
  return httpClient.put(`${END_POINT}/like/${postId}`, null, {
    headers: setAuthToken()
  })
}

const unlikePost = (postId: string) => {
  return httpClient.put(`${END_POINT}/unlike/${postId}`, null, {
    headers: setAuthToken()
  })
}

const deletePost = (postId: string) => {
  return httpClient.delete(`${END_POINT}/${postId}`, {
    headers: setAuthToken()
  })
}

export { getPosts, getPostById, createPost, likePost, unlikePost, deletePost }
