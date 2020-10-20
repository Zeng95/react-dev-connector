import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock, UserCircle } from '@styled-icons/fa-solid'
import { Description, PageStyled, Title } from 'components/Shared/Styles'
import { RegisterPage } from 'hooks/useRegister'
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
  HelpBlock,
  InputGroup,
  Schema
} from 'rsuite'

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
    <PageStyled>
      <Title>Register</Title>

      <Description>
        <ReactLogo size="24" />
        <span>Sign up for free and experience DevConnector today</span>
      </Description>

      <Form
        fluid
        model={model}
        ref={register.formEl}
        formValue={register.user}
        autoComplete="off"
        checkTrigger="none"
        onChange={formValue => register.onChange(formValue)}
      >
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <UserCircle size="16" title="Username" />
            </InputGroup.Addon>
            <FormControl
              name="username"
              placeholder="Username"
              onKeyPress={register.onKeyUp}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Email address</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <Envelope size="16" title="Email address" />
            </InputGroup.Addon>
            <FormControl
              name="email"
              type="email"
              placeholder="Email address"
              accepter={AutoComplete}
              data={register.email}
              onKeyPress={register.onKeyUp}
              onChange={register.onEmailChange}
            />
          </InputGroup>
          <HelpBlock>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </HelpBlock>
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
              onKeyPress={register.onKeyUp}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Confirm password</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <Lock size="16" title="Confirm password" />
            </InputGroup.Addon>
            <FormControl
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              autoComplete="on"
              onKeyPress={register.onKeyUp}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              disabled={register.user.isSubmitting}
              loading={register.user.isSubmitting}
              appearance="primary"
              size="lg"
              onClick={register.onSubmit}
            >
              Submit
            </Button>
            <Button
              disabled={register.user.isSubmitting}
              appearance="default"
              size="lg"
              onClick={register.onReset}
            >
              Clear
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
    </PageStyled>
  )
}

export { Register }
