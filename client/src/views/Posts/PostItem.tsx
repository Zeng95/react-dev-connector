import { ThumbsDown, ThumbsUp, Times } from '@styled-icons/fa-solid'
import { AppLazyImage } from 'components/LazyImage'
import { IconStyledWrapper } from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import moment from 'moment'
import React, { useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Button, Icon, IconButton } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'
import { removeChar } from 'utils'

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

const Card = styled.li.attrs({
  className: 'relative mb-4 p-8 bg-white'
})`
  &::before,
  &::after {
    ${tw`absolute top-0 left-0 w-full h-full pointer-events-none`}

    content: '';
    border-radius: 6px;
    transition: 0.3s ease;
  }

  &::before {
    ${tw`opacity-100`}

    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1), 0 3px 4px 0 rgba(20, 23, 28, 0.1);
  }

  &::after {
    ${tw`opacity-0`}

    box-shadow: 0 2px 12px 2px rgba(20, 23, 28, 0.15);
  }

  &:hover {
    &::before {
      ${tw`opacity-0`}
    }

    &::after {
      ${tw`opacity-100`}
    }
  }

  &:last-of-type {
    > a {
      margin-bottom: 0;
    }
  }
`

const CardHeader = styled.div.attrs({
  className: 'inline-flex items-center mb-2'
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

  &:hover {
    color: #08090a;
  }
`
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

  > a {
    &:hover {
      color: #17a2b8;
    }
  }
`
const ControlButton = styled(Button).attrs({
  className: 'items-center mr-3'
})`
  display: inline-flex;
  height: 40px;
  padding: 0.5rem 1.25rem;
`
const IconButtonStyled = styled(IconButton).attrs({
  className: 'items-center mr-3'
})`
  display: inline-flex;
  height: 40px !important;
  padding: 0.5rem 1.25rem;
  padding-left: 40px !important;

  > .rs-icon {
    width: auto !important;
    height: auto !important;
    padding: 8px !important;
  }
`
const CommentCount = styled.span.attrs({
  className: 'inline-block ml-2 bg-light text-primary'
})`
  padding: 0.1rem 0.2rem;
  border-radius: 4px;
  font-size: 0.8rem;
`
const LikeCount = styled.span``

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { title, user, avatar, username, likes, comments, date } = post

  const auth = useContext(AuthContext)
  const { user: loggedInUser } = auth.state

  const history = useHistory()
  const location = useLocation()

  const linkLocation = {
    pathname: `/profiles/${removeChar(username)}`,
    state: { userId: user }
  }

  const likePost = () => {
    if (loggedInUser === null) {
      console.log(1)
      history.push({
        pathname: '/login',
        search: `?next=${location.pathname}`,
        state: { from: location }
      })
    }
  }

  const unlikePost = () => {
    if (loggedInUser === null) {
      console.log(1)
      history.push({
        pathname: '/login',
        search: `?next=${location.pathname}`,
        state: { from: location }
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        {/* 图片懒加载 */}
        <AppLazyImage
          linkPath={linkLocation}
          src={avatar}
          alt={`${username} profile image`}
          width={'40px'}
          height={'40px'}
        />

        {/* 用户信息 */}
        <UserInfo>
          <UserName>
            <Link to={linkLocation}>{username}</Link>
          </UserName>
          <PostDate>
            <Link to={`/posts/${removeChar(username)}/${removeChar(title)}`}>
              {moment(date).format("MMM D 'YY")}
            </Link>
          </PostDate>
        </UserInfo>
      </CardHeader>

      <CardBody>
        <CardBodyTitle>
          <Link to={`/posts/${removeChar(username)}/${removeChar(title)}`}>
            {title}
          </Link>
        </CardBodyTitle>

        <ControlButton onClick={likePost}>
          <IconStyledWrapper>
            <ThumbsUp size="16" />
          </IconStyledWrapper>
          {likes.length > 0 && <LikeCount>{likes.length}</LikeCount>}
        </ControlButton>

        <ControlButton onClick={unlikePost}>
          <ThumbsDown size="16" />
        </ControlButton>

        <IconButtonStyled
          appearance="primary"
          icon={<Icon icon="comments" />}
          placement="left"
        >
          <span>Comments</span>
          {comments.length > 0 && (
            <CommentCount>{comments.length}</CommentCount>
          )}
        </IconButtonStyled>

        {loggedInUser !== null && loggedInUser['_id'] === user && (
          <ControlButton color="red">
            <IconStyledWrapper>
              <Times size="16" />
            </IconStyledWrapper>
          </ControlButton>
        )}
      </CardBody>
    </Card>
  )
}

export { PostItem }
