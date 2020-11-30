import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  List,
  NotFound,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { PostContext } from 'context/post/PostContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { Divider } from 'rsuite'
import styled from 'styled-components'
import { PostItem } from './components/PostItem'

const PostList = styled(List)``
const PostsNotFound = styled(NotFound)``

const Posts: React.FC = () => {
  const post = useContext(PostContext)
  const { dataLoading: postsDataLoading, posts } = post.state
  const { getAllPosts } = post.actions

  const getPosts = useCallback(getAllPosts, [])

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return postsDataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Posts</Title>

      <Divider />

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
