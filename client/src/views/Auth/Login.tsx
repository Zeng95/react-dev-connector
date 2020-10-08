import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock } from '@styled-icons/fa-solid'
import { LoginPage } from 'hooks/useLogin'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Schema
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const LoginPageStyled = styled.section.attrs({
  className: 'mx-auto px-8'
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

const Login: React.FC = () => {
  const login = LoginPage()
  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
  })

  return (
    <LoginPageStyled>
      <Title>Log In</Title>

      <Description>
        <ReactLogo size="24" />
        <span>Log into Your Account</span>
      </Description>

      <Form
        fluid
        autoComplete="off"
        checkTrigger="blur"
        formValue={login.user}
        model={model}
        ref={login.formEl}
        onChange={formValue => login.onChange(formValue)}
      >
        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              placeholder="Email Address"
              onKeyPress={login.onKeyUp}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              onKeyPress={login.onKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              disabled={login.user.isSubmitting}
              loading={login.user.isSubmitting}
              appearance="primary"
              size="lg"
              onClick={login.onLogin}
            >
              Submit
            </Button>
            <Button
              disabled={login.user.isSubmitting}
              appearance="default"
              size="lg"
              onClick={login.onReset}
            >
              Remove
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <p className="my-4">
        Don't have an account?{' '}
        <strong>
          <Link to="/register">Register now</Link>
        </strong>
      </p>
    </LoginPageStyled>
  )
}

export { Login }
