import { AuthContext } from 'context/auth/AuthContext'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

type ButtonProps = {
  readonly btnName: string
}

const LandingStyled = styled.section.attrs({
  className: 'absolute top-0 left-0 w-screen h-screen'
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
const BasicButton = styled.button.attrs({
  className: 'inline-block rounded-sm bg-light text-base outline-none'
})<ButtonProps>`
  width: 100px;
  color: #333;
  margin-right: 0.5rem;
  transition: opacity 0.3s ease-in;

  a {
    ${tw`block`}

    padding: 0.4rem 0;
    color: inherit;
  }

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
      margin-right: 0;
      background: #f4f4f4;
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
            <BasicButton btnName="register">
              <Link to="register">Register</Link>
            </BasicButton>
            <BasicButton btnName="login">
              <Link to="login">Login</Link>
            </BasicButton>
          </div>
        </Content>
      </OverLay>
    </LandingStyled>
  )
}

export { Landing }
