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

const createPost = () => {
  return httpClient.post(`${END_POINT}`)
}

export { getPosts, getPostById, createPost }
