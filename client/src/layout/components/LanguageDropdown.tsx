import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Dropdown, Popover } from 'rsuite'
import styled from 'styled-components'

interface AvatarDropdownProps {
  user: {
    _id: string
    email: string
    avatar: string
    username: string
  }
}

interface NavLinkProps {
  href: string
}

const UserSection = styled.div.attrs({
  className: 'flex items-center'
})``
const UserDetails = styled.div.attrs({
  className: 'flex flex-col ml-3'
})``
const UserName = styled.h3.attrs({
  className: 'font-bold'
})`
  letter-spacing: -0.02rem;
`
const UserEmail = styled.div.attrs({
  className: 'text-xs truncate'
})`
  color: #73726c;
  margin-top: 0.4rem;
`

const MyLink: React.FC<NavLinkProps> = props => {
  const { href, ...rest } = props
  return <Link to={href} {...rest} />
}

const NavLink: React.FC<NavLinkProps> = props => {
  return <Dropdown.Item componentClass={MyLink} {...props} />
}

const LanguageDropdown: React.FC<AvatarDropdownProps> = ({ user, ...rest }) => {
  return (
    <Popover {...rest}>
      <Dropdown.Menu style={{ minWidth: '18rem' }}>
        <Dropdown.Item>
          <UserSection>
            <Avatar circle size="lg" src={user.avatar} />
            <UserDetails>
              <UserName>{user.username}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserDetails>
          </UserSection>
        </Dropdown.Item>
        <Dropdown.Item divider />
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/posts/new">Write a Post</NavLink>
        <NavLink href="/user/edit-profile">Edit profile</NavLink>
        <Dropdown.Item divider />
        <Dropdown.Item>Help</Dropdown.Item>
        <NavLink href="/logout">Log out</NavLink>
      </Dropdown.Menu>
    </Popover>
  )
}

export { LanguageDropdown }
