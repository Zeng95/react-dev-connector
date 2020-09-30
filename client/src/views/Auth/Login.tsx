import { LoginPage } from 'hooks/useLogin'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  Icon,
  InputGroup,
  Schema
} from 'rsuite'
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
    <LoginStyled>
      <Title>Sign In</Title>

      <Description>
        <Icon icon="globe" size="2x" />
        <span>Sign into Your Account</span>
      </Description>

      <Form
        fluid
        autoComplete="off"
        checkTrigger="blur"
        formValue={login.user}
        model={model}
        ref={login.form}
        onChange={formValue => login.onChange(formValue)}
      >
        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <InputGroup.Addon>
              <Icon icon="envelope" />
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
            />
            <InputGroup.Addon>
              <Icon icon="key" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              disabled={login.user.isSubmitting}
              loading={login.user.isSubmitting}
              appearance="primary"
              type="submit"
              size="lg"
              onClick={login.handleLogin}
            >
              Submit
            </Button>
            <Button
              disabled={login.user.isSubmitting}
              appearance="default"
              type="reset"
              size="lg"
              onClick={login.onReset}
            >
              Remove
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
