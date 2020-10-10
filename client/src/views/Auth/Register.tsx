import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock, UserCircle } from '@styled-icons/fa-solid'
import { RegisterPage } from 'hooks/useRegister'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Schema
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const RegisterPageStyled = styled.section.attrs({
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

const Register: React.FC = () => {
  const register = RegisterPage()
  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    username: StringType().isRequired('This field is required.'),
    password: StringType()
      .minLength(6, 'Minimum 6 characters required')
      .isRequired('This field is required.'),
    confirmPassword: StringType()
      .addRule((value, data) => {
        if (value !== data.password) return false

        return true
      }, 'The two passwords do not match')
      .isRequired('This field is required.')
  })

  return (
    <RegisterPageStyled>
      <Title>Register</Title>

      <Description>
        <ReactLogo size="24" />
        <span>Create Your Account</span>
      </Description>

      <Form
        fluid
        autoComplete="off"
        checkTrigger="blur"
        formValue={register.user}
        model={model}
        ref={register.formEl}
        onChange={formValue => register.onChange(formValue)}
      >
        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="username"
              placeholder="Username"
              onKeyPress={register.onKeyUp}
            />
            <InputGroup.Addon>
              <UserCircle size="16" title="Username" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              placeholder="Email Address"
              onKeyPress={register.onKeyUp}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
          </InputGroup>
          <HelpBlock>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </HelpBlock>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              onKeyPress={register.onKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="on"
              onKeyPress={register.onKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Confirm Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              disabled={register.user.isSubmitting}
              loading={register.user.isSubmitting}
              appearance="primary"
              size="lg"
              onClick={register.onRegister}
            >
              Submit
            </Button>
            <Button
              disabled={register.user.isSubmitting}
              appearance="default"
              size="lg"
              onClick={register.onReset}
            >
              Remove
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <p className="my-4">
        Already have an account?{' '}
        <strong>
          <Link to="/login" className="text-primary">
            Log in
          </Link>
        </strong>
      </p>
    </RegisterPageStyled>
  )
}

export { Register }
