import React from 'react'
import styled from 'styled-components'

const LandingStyled = styled.section.attrs({
  className: 'relative h-screen'
})`
  background: url(${require('assets/images/showcase.jpg')}) no-repeat center
    center/cover;
`

const Landing = () => {
  return (
    <LandingStyled>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Sign Up
            </a>
            <a href="login.html" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </LandingStyled>
  )
}

export default Landing
