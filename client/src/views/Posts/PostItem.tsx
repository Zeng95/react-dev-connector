import { ThumbsDown, ThumbsUp, Times } from '@styled-icons/fa-solid'
import { AppLazyImage } from 'components/LazyImage'
import { IconStyledWrapper } from 'components/Shared/Styles'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

interface ILike {
  user: string
}

interface IComment {
  text: string
}

interface IPost {
  _id: string
  title: string
  content: string
  user: string
  username: string
  avatar: string
  likes: ILike[]
  comments: IComment[]
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
const Card = styled.div.attrs({
  className: 'relative mb-4 p-8 bg-white'
})`
  &::before {
    ${tw`absolute top-0 left-0 w-full h-full`}

    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1), 0 3px 4px 0 rgba(20, 23, 28, 0.1);
    border-radius: 6px;
    content: '';
  }
`

const CardHeader = styled.div.attrs({
  className: 'flex items-center mb-2'
})``
const UserInfo = styled.div.attrs({
  className: 'ml-2'
})`
  line-height: 17.5px;
`
const UserName = styled.h4.attrs({
  className: 'text-sm font-medium'
})`
  color: #4d5760;
`
const LinkStyled = styled(Link).attrs({
  className: 'inline-block'
})`
  width: 32px;
  height: 32px;
`
const UserAvatar = styled.img.attrs({
  className: 'rounded-full'
})``
const PostDate = styled.time.attrs({
  className: 'text-xs'
})`
  color: #64707d;
`

const CardBody = styled.div.attrs({
  className: 'pl-10'
})``
const CardBodyTitle = styled.h2.attrs({
  className: 'mb-2 text-2xl font-bold'
})`
  color: #08090a;
`
const ControlButton = styled(Button).attrs({
  className: 'items-center mr-3'
})`
  display: inline-flex;
  height: 40px;
  padding: 0.5rem 1.25rem;
`

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { title, avatar, username, likes, comments, date } = post

  return (
    <PostItemStyled>
      <Card>
        <CardHeader>
          {/* 图片懒加载 */}
          <AppLazyImage>
            <LinkStyled to="profiles">
              <UserAvatar src={avatar} alt={`${username} profile image`} />
            </LinkStyled>
          </AppLazyImage>

          {/* 用户信息 */}
          <UserInfo>
            <UserName>
              <Link to={`profiles`}>{username}</Link>
            </UserName>
            <Link to="profiles">
              <PostDate>{moment(date).format("MMM D 'YY")}</PostDate>
            </Link>
          </UserInfo>
        </CardHeader>

        <CardBody>
          <CardBodyTitle>{title}</CardBodyTitle>

          <ControlButton>
            <IconStyledWrapper>
              <ThumbsUp size="16" />
            </IconStyledWrapper>
            {likes.length > 0 && <span>{likes.length}</span>}
          </ControlButton>

          <ControlButton>
            <IconStyledWrapper>
              <ThumbsDown size="16" />
            </IconStyledWrapper>
          </ControlButton>

          <ControlButton appearance="primary">
            <span>Comments</span>
            {comments.length > 0 && <span className="comment-count">2</span>}
          </ControlButton>

          <ControlButton color="red">
            <IconStyledWrapper>
              <Times size="16" />
            </IconStyledWrapper>
          </ControlButton>
        </CardBody>
      </Card>
    </PostItemStyled>
  )
}

export { PostItem }
