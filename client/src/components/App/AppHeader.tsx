import { Globe } from '@styled-icons/fa-solid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

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

  a {
    ${tw`flex items-center`}
  }
`
const Menu = styled.ul.attrs({
  className: 'flex mb-0'
})``
const MenuItem = styled.li``

const AppHeader = () => (
  <AppHeaderStyled>
    <NavBar>
      <Logo>
        <Link to="/">
          <Globe size="24" title="Logo" />
          &nbsp;
          <span>DevConnector</span>
        </Link>
      </Logo>

      <Menu>
        <MenuItem>
          <Link to="/profiles">中文</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/profiles">Developers</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">Register</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login">Login</Link>
        </MenuItem>
      </Menu>
    </NavBar>
  </AppHeaderStyled>
)

export { AppHeader }
