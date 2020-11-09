import { AppLazyImage } from 'components/LazyImage'
import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

interface IPost {
  _id: string
  title: string
  content: string
  user: string
  username: string
  avatar: string
  date: string
}

interface PostItemProps {
  post: IPost
}

const PostItemStyled = styled.li`
  &:last-of-type {
    > a {
      margin-bottom: 0;
    }
  }
`
const Content = styled.div.attrs({
  className: 'relative grid items-center mb-6 p-8 bg-white'
})`
  grid-template-columns: 2fr 4fr 2fr;
  grid-gap: 2rem;
  line-height: 1.8;

  &::before {
    ${tw`absolute top-0 left-0 w-full h-full`}

    content: '';
    border-radius: 6px;
    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
      0 3px 4px 0 rgba(20, 23, 28, 0.1);
  }
`

const UserInfo = styled.div``
const UserName = styled.h4``

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { avatar, username } = post

  return (
    <PostItemStyled>
      <Content>
        <UserInfo>
          <AppLazyImage src={avatar} alt="User Avatar" />
          <UserName>{username}</UserName>
        </UserInfo>
        abc
      </Content>
    </PostItemStyled>
  )
}

export { PostItem }
