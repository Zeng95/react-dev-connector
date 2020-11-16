import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { PostContext } from 'context/post/PostContext'
import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { PostItem } from './PostItem'

const PostList = styled.ul``
const PostsNotFound = styled.h4``

const Posts: React.FC = () => {
  const auth = useContext(AuthContext)
  const { pageLoading: authPageLoading } = auth.state

  const post = useContext(PostContext)
  const { posts, pageLoading: profilePageLoading } = post.state
  const { getAllPosts } = post.actions

  const getPosts = useCallback(getAllPosts, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return authPageLoading || profilePageLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Posts</Title>

      <Description>
        <IconStyledWrapper>
          <User size="24" title="User" />
        </IconStyledWrapper>
        <span>Welcome to the community!</span>
      </Description>

      {/* Check to make sure that there are posts */}
      {posts.length > 0 ? (
        <PostList>
          {posts.map(post => {
            return <PostItem key={post['_id']} post={post} />
          })}
        </PostList>
      ) : (
        <PostsNotFound>No posts found...</PostsNotFound>
      )}
    </PageStyled>
  )
}

export { Posts }
