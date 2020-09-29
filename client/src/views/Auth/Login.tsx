import { User } from '@styled-icons/fa-solid'
import { LoginPage } from 'hooks/useLogin'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar, Form, FormControl, FormGroup } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const LoginStyled = styled.div.attrs({
  className: 'mx-auto mt-24 px-8'
})`
  max-width: 1100px;
`
const Title = styled.h1.attrs({
  className: 'mb-4 text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
`
const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`

const Login: FunctionComponent = () => {
  const login = LoginPage()

  return (
    <LoginStyled>
      <Title>Sign In</Title>

      <Description>
        <User size="24" title="User" />
        <span>Sign into Your Account</span>
      </Description>

      <Form
        fluid
        autoComplete="off"
        checkTrigger="blur"
        formValue={login.user}
        model={login.userModel}
        onChange={formValue => login.onChange(formValue)}
      >
        <FormGroup>
          <FormControl name="email" type="email" placeholder="Email Address" />
        </FormGroup>

        <FormGroup>
          <FormControl
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              appearance="primary"
              type="submit"
              size="lg"
              onClick={login.handleLogin}
            >
              Submit
            </Button>
            <Button
              appearance="default"
              type="reset"
              size="lg"
              onClick={login.onReset}
            >
              Delete
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <p className="my-4">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
    </LoginStyled>
  )
}

export { Login }
