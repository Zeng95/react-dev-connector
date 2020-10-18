import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock } from '@styled-icons/fa-solid'
import { LoginPage } from 'hooks/useLogin'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  AutoComplete,
  Button,
  ButtonToolbar,
  ControlLabel,
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
        <span>Log in to your account</span>
      </Description>

      <Form
        fluid
        model={model}
        ref={login.formEl}
        formValue={login.user}
        autoComplete="off"
        checkTrigger="none"
        onChange={formValue => login.onChange(formValue)}
      >
        <FormGroup>
          <ControlLabel>Email address</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
            <FormControl
              name="email"
              type="email"
              placeholder="Email address"
              accepter={AutoComplete}
              data={login.email}
              onKeyPress={login.onKeyUp}
              onChange={login.onEmailChange}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              onKeyPress={login.onKeyUp}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              disabled={login.user.isSubmitting}
              loading={login.user.isSubmitting}
              appearance="primary"
              size="lg"
              onClick={login.onSubmit}
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
          <Link to="/register" className="text-primary">
            Register now
          </Link>
        </strong>
      </p>
    </LoginPageStyled>
  )
}

export { Login }
