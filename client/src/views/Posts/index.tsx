import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyleWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { PostContext } from 'context/post/PostContext'
import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'

const PostsNotFound = styled.h4``

const Posts: React.FC = () => {
  const { state, actions } = useContext(PostContext)
  const { posts, pageLoading } = state
  const { getAllPosts } = actions

  const getPosts = useCallback(getAllPosts, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return pageLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Posts</Title>

      <Description>
        <IconStyleWrapper>
          <User size="24" title="User" />
        </IconStyleWrapper>
        <span>Welcome to the community!</span>
      </Description>

      {/* Check to make sure that there are profiles */}
      {posts.length > 0 ? (
        <div>posts</div>
      ) : (
        <PostsNotFound>No posts found...</PostsNotFound>
      )}
    </PageStyled>
  )
}

export { Posts }
