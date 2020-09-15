import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface ButtonProps {
  readonly btnName: string
}

const LandingStyled = styled.section.attrs({
  className: 'relative h-screen'
})`
  background: url(${require('assets/images/showcase.jpg')}) no-repeat center
    center/cover;
`
const OverLay = styled.div.attrs({
  className: 'absolute top-0 left-0 right-0 w-full h-full z-10'
})`
  background-color: rgba(0, 0, 0, 0.7);
`
const Content = styled.div.attrs({
  className:
    'flex flex-col justify-center items-center h-full mx-auto text-center text-white'
})`
  width: 80%;
`
const Title = styled.h1.attrs({
  className: 'font-bold text-5xl'
})``
const Description = styled.p.attrs({
  className: 'my-4 text-base'
})``
const BasicButton = styled.button.attrs({
  className: 'inline-block bg-light text-base outline-none'
})<ButtonProps>`
  color: #333;
  margin-right: 0.5rem;
  border: none;
  padding: 0.4rem 1.3rem;
  transition: opacity 0.3s ease-in;
  &:hover {
    opacity: 0.8;
  }

  ${props =>
    props.btnName === 'register' &&
    css`
      background: #17a2b8;
      color: #fff;
    `}

  ${props =>
    props.btnName === 'login' &&
    css`
      background: #f4f4f4;
    `}

  a {
    color: inherit;
  }
`

const Landing = () => (
  <LandingStyled>
    <OverLay>
      <Content>
        <Title>Developer Connector</Title>

        <Description>
          Create a developer profile/portfolio, share posts and get help
          fromother developers
        </Description>

        <div className="actions">
          <BasicButton btnName="register">
            <Link to="register">Sign Up</Link>
          </BasicButton>

          <BasicButton btnName="login">
            <Link to="login">Login</Link>
          </BasicButton>
        </div>
      </Content>
    </OverLay>
  </LandingStyled>
)

export default Landing
