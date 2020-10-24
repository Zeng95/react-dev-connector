import { Centos } from '@styled-icons/fa-brands'
import { Edit, SignOutAlt, TachometerAlt, Users } from '@styled-icons/fa-solid'
import { AuthContext } from 'context/auth/AuthContext'
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AppHeaderStyled = styled.header.attrs({
  className: 'fixed top-0 left-0 right-0 w-full bg-dark z-20'
})`
  border-bottom: solid 1px #17a2b8;
  opacity: 0.9;

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
  className: 'flex mb-0'
})``
const MenuItem = styled.li``
const LinkStyled = styled(Link).attrs({
  className: 'flex items-center'
})``
const IconStyleWrapper = styled.span.attrs({
  className: 'inline-flex mr-1'
})``

const AppHeader: React.FC = () => {
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state

  const authLinks = (
    <Fragment>
      <MenuItem>
        <LinkStyled to="/posts">
          <IconStyleWrapper>
            <Edit size="16" title="User posts" />
          </IconStyleWrapper>
          <span>Posts</span>
        </LinkStyled>
      </MenuItem>
      <MenuItem>
        <LinkStyled to="/dashboard">
          <IconStyleWrapper>
            <TachometerAlt size="16" title="Dashboard" />
          </IconStyleWrapper>
          <span>Dashboard</span>
        </LinkStyled>
      </MenuItem>
      <MenuItem>
        <LinkStyled to="/logout">
          <IconStyleWrapper>
            <SignOutAlt size="16" title="Logout account" />
          </IconStyleWrapper>
          <span>Logout</span>
        </LinkStyled>
      </MenuItem>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <MenuItem>
        <LinkStyled to="/register">Register</LinkStyled>
      </MenuItem>
      <MenuItem>
        <LinkStyled to="/login">Login</LinkStyled>
      </MenuItem>
    </Fragment>
  )

  return (
    <AppHeaderStyled>
      <NavBar>
        <Logo>
          <LinkStyled to="/">
            <IconStyleWrapper>
              <Centos size="30" title="Logo" />
            </IconStyleWrapper>
            <span>DevConnector</span>
          </LinkStyled>
        </Logo>

        <Menu>
          <MenuItem>
            <LinkStyled to="/profiles">
              <IconStyleWrapper>
                <Users size="16" title="User profiles" />
              </IconStyleWrapper>
              <span>Developers</span>
            </LinkStyled>
          </MenuItem>
          {isAuthenticated || token ? authLinks : guestLinks}
        </Menu>
      </NavBar>
    </AppHeaderStyled>
  )
}

export { AppHeader }
