import { User } from '@styled-icons/fa-solid'
import { RegisterPage } from 'hooks/useRegister'
import React, { FunctionComponent } from 'react'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  HelpBlock
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const RegisterStyled = styled.div.attrs({
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

const Register: FunctionComponent = () => {
  const register = RegisterPage()

  return (
    <RegisterStyled>
      <Title>Sign Up</Title>

      <Description>
        <User size="24" title="User" />
        <span>Create Your Account</span>
      </Description>

      <Form
        fluid
        autoComplete="off"
        formValue={register.user}
        onChange={formValue => register.onChange(formValue)}
      >
        <FormGroup>
          <FormControl name="username" placeholder="Username" />
        </FormGroup>

        <FormGroup>
          <FormControl name="email" type="email" placeholder="Email Address" />
          <HelpBlock>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </HelpBlock>
        </FormGroup>

        <FormGroup>
          <FormControl name="password" type="password" placeholder="Password" />
        </FormGroup>

        <FormGroup>
          <FormControl
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary">Register</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <p className="my-4">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </RegisterStyled>
  )
}

export { Register }
