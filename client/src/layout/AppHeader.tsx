import {
  PenSquare,
  ShareAlt,
  UserEdit,
  UserFriends
} from '@styled-icons/fa-solid'
import { IconStyledWrapper } from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Whisper } from 'rsuite'
import styled, { css } from 'styled-components'
import { AvatarDropdown } from './AvatarDropdown'

interface MenuItemProps {
  name?: string
}

const AppHeaderStyled = styled.header.attrs({
  className: 'fixed top-0 left-0 right-0 w-full z-20'
})`
  height: 74px;
  border-bottom: solid 1px #17a2b8;
  background-color: rgba(52, 58, 64, 0.9);

  a {
    color: white;
    margin: 0 0.25rem;
    padding: 0.45rem;
    transition: color 0.3s;

    &:hover {
      color: #17a2b8;
    }
  }
`
const NavBar = styled.nav.attrs({
  className: 'flex justify-between items-center'
})`
  padding: 0.7rem 2rem;
`
const Logo = styled.h1.attrs({
  className: 'font-bold leading-normal'
})`
  font-size: 1.5em;
`
const Menu = styled.ul.attrs({
  className: 'flex items-center'
})``
const MenuItem = styled.li<MenuItemProps>`
  ${props =>
    props.name === 'popover' &&
    css`
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    `}
`
const LinkStyled = styled(Link).attrs({
  className: 'flex items-center'
})``

const AppHeader: React.FC = () => {
  const auth = useContext(AuthContext)
  const { user, isAuthenticated, token } = auth.state
  const { userLoad } = auth.actions

  const getCurrentUser = useCallback(userLoad, [])

  const triggerRef = React.createRef()
  const handleSelectMenu = (eventKey: any, event: any) => {
    console.log(eventKey)
  }

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  const authLinks = (
    <Fragment>
      <MenuItem>
        <LinkStyled to="/posts/new">
          <IconStyledWrapper>
            <PenSquare size="16" title="Dashboard" />
          </IconStyledWrapper>
          <span>Write a Post</span>
        </LinkStyled>
      </MenuItem>
      <MenuItem name="popover">
        {user !== null ? (
          <Whisper
            placement="bottomEnd"
            trigger="hover"
            triggerRef={triggerRef}
            speaker={<AvatarDropdown user={user} onSelect={handleSelectMenu} />}
            enterable={true}
          >
            <Avatar
              circle
              size="sm"
              src={user.avatar}
              alt={`${user.username} profile image`}
            />
          </Whisper>
        ) : (
          <Avatar circle size="sm" />
        )}
      </MenuItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <MenuItem>
        <Link to="/login">Log in</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/register">Create account</Link>
      </MenuItem>
    </Fragment>
  )

  return (
    <AppHeaderStyled>
      <NavBar>
        <Logo>
          <LinkStyled to="/">
            <IconStyledWrapper>
              <ShareAlt size="26" title="Logo" />
            </IconStyledWrapper>
            <span>DevConnector</span>
          </LinkStyled>
        </Logo>

        <Menu>
          <MenuItem>
            <LinkStyled to="/profiles">
              <IconStyledWrapper>
                <UserFriends size="18" title="User profiles" />
              </IconStyledWrapper>
              <span>Developers</span>
            </LinkStyled>
          </MenuItem>
          <MenuItem>
            <LinkStyled to="/posts">
              <IconStyledWrapper>
                <UserEdit size="18" title="User posts" />
              </IconStyledWrapper>
              <span>Posts</span>
            </LinkStyled>
          </MenuItem>
          {isAuthenticated || token ? authLinks : guestLinks}
        </Menu>
      </NavBar>
    </AppHeaderStyled>
  )
}

export { AppHeader }
