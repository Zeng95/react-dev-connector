import React from 'react'
import styled from 'styled-components'
import { Code } from '@styled-icons/fa-solid'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

const AppHeader = styled.header.attrs({
  className: 'fixed top-0 left-0 right-0 w-full bg-dark z-20'
})`
  opacity: 0.9;
  border-bottom: solid 1px white;
  a {
    color: white;
    padding: 0.45rem;
    margin: 0 0.25rem;
    transition: color 0.3s;
    &:hover {
      color: #17a2b8;
    }
  }
`
const NavBarStyled = styled.nav.attrs({
  className: 'flex justify-between items-center'
})`
  padding: 1rem 2rem;
`
const Logo = styled.h1.attrs({
  className: 'font-bold'
})`
  font-size: 1.5em;
  a {
    ${tw`flex items-center`}
  }
`
const Menu = styled.ul.attrs({
  className: 'flex'
})``
const MenuItem = styled.li``

const AppNavbar = () => (
  <AppHeader>
    <NavBarStyled>
      <Logo>
        <Link to="/">
          <Code size="24" />
          &nbsp;
          <span>DevConnector</span>
        </Link>
      </Logo>

      <Menu>
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
    </NavBarStyled>
  </AppHeader>
)

export default AppNavbar
