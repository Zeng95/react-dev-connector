import React from 'react'
import styled from 'styled-components'

const NavBarStyled = styled.nav``

const AppNavbar = () => {
  return (
    <header>
      <NavBarStyled>
        <h1>
          <a href="index.html">
            <i className="fas fa-code"></i> DevConnector
          </a>
        </h1>

        <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
          <li>
            <a href="register.html">Register</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </NavBarStyled>
    </header>
  )
}

export default AppNavbar
