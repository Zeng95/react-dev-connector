import httpClient from './httpClient'

const END_POINT = '/comments'

const getComments = () => {
  return httpClient.get(`${END_POINT}/all`)
}

export { getComments }
