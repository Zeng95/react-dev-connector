import React from 'react'
import styled from 'styled-components'
import { Code } from '@styled-icons/fa-solid'

const AppHeader = styled.header.attrs({
  className: 'fixed inset-0 bottom-auto w-full bg-black text-white z-10'
})`
  opacity: 0.9;
`
const NavBarStyled = styled.nav.attrs({
  className: 'flex justify-between items-center'
})`
  padding: 0.7rem 2rem;
`
const Menu = styled.ul.attrs({
  className: 'flex'
})``
const MenuItem = styled.li.attrs({})`
  & {
    a {
      color: #fff;
      padding: 0.45rem;
      margin: 0 0.25rem;
    }
  }
`

const AppNavbar = () => {
  return (
    <AppHeader>
      <NavBarStyled>
        <h1>
          <a href="index.html" className={'flex text-white'}>
            <Code size="24" />
            &nbsp;
            <span>DevConnector</span>
          </a>
        </h1>

        <Menu>
          <MenuItem>
            <a href="profiles.html">Developers</a>
          </MenuItem>
          <MenuItem>
            <a href="register.html">Register</a>
          </MenuItem>
          <MenuItem>
            <a href="login.html">Login</a>
          </MenuItem>
        </Menu>
      </NavBarStyled>
    </AppHeader>
  )
}

export default AppNavbar
