import { User } from '@styled-icons/fa-solid'
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
  className: 'mx-auto mt-24'
})`
  max-width: 1100px;
`
const Title = styled.h1.attrs({
  className: 'text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`
const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`

const Register: FunctionComponent = () => (
  <RegisterStyled>
    <Title>Sign Up</Title>

    <Description>
      <User size="24" title="User" />
      <span>Create Your Account</span>
    </Description>

    <Form fluid>
      <FormGroup className="flex">
        <FormControl name="name" placeholder="Name" />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>

      <FormGroup className="flex">
        <FormControl name="email" type="email" placeholder="Email Address" />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>

      <FormGroup className="flex">
        <FormControl
          name="password"
          type="password"
          placeholder="Password"
          minLength={6}
        />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>

      <FormGroup className="flex">
        <FormControl
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          minLength={6}
        />
        <HelpBlock tooltip>Required</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ButtonToolbar>
          <Button appearance="primary">Register</Button>
          <Button appearance="default">Cancel</Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>

    <p className="my-1">
      Already have an account? <a href="login.html">Sign In</a>
    </p>
  </RegisterStyled>
)

export { Register }
