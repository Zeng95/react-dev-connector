import { AuthContext } from 'context/auth/AuthContext'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

interface LinkProps {
  readonly name: string
}

const LandingStyled = styled.section.attrs({
  className: 'absolute top-0 left-0 w-full h-full'
})`
  background: url(${require('assets/images/showcase.jpg')}) no-repeat center;
  background-size: cover;
`
const OverLay = styled.div.attrs({
  className: 'absolute top-0 right-0 left-0 w-full h-full z-10'
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
  className: 'font-bold text-6xl leading-tight'
})``
const Description = styled.p.attrs({
  className: 'my-4 text-2xl'
})``
const AuthLink = styled(Link).attrs({
  className: 'inline-block py-2 px-5 rounded-md'
})<LinkProps>`
  width: 100px;
  transition: opacity 0.3s ease-in;

  &:hover {
    opacity: 0.8;
  }

  ${props =>
    props.name === 'login' &&
    css`
      ${tw`mr-3`}

      color: #333;
      background-color: #f4f4f4;
    `}

  ${props =>
    props.name === 'register' &&
    css`
      ${tw`mr-0`}

      color: #fff;
      background-color: #17a2b8;
    `}
`

const Landing: React.FC = () => {
  const history = useHistory()
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state

  if (isAuthenticated || token) {
    history.push('/dashboard')
  }

  return (
    <LandingStyled>
      <OverLay>
        <Content>
          <Title>Developer Connector</Title>

          <Description>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </Description>

          <div className="actions">
            <AuthLink to="login" name="login">
              Log in
            </AuthLink>
            <AuthLink to="register" name="register">
              Sign up
            </AuthLink>
          </div>
        </Content>
      </OverLay>
    </LandingStyled>
  )
}

export { Landing }
