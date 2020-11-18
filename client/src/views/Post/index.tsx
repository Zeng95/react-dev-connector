import { AppLoader } from 'components/Loader'
import { PageStyled } from 'components/Shared/Styles'
import { PostContext } from 'context/post/PostContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from 'rsuite'

interface LocationState {
  postId: string
}

const Post: React.FC = () => {
  const history = useHistory()
  const location = useLocation<LocationState>()
  const { postId } = location.state

  const post = useContext(PostContext)
  const { dataLoading: postDataLoading, post: singlePost } = post.state
  const { getSinglePost } = post.actions

  const getPost = useCallback(getSinglePost, [])

  const navigateToPosts = () => {
    history.push('/posts')
  }

  useEffect(() => {
    getPost(postId)
  }, [getPost, postId])

  return postDataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      {singlePost !== null ? (
        <Fragment>
          <Button appearance="ghost" onClick={navigateToPosts}>
            Back To Posts
          </Button>
        </Fragment>
      ) : (
        <h4>No post credentials</h4>
      )}
    </PageStyled>
  )
}

export { Post }
