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
  const {
    formEl,
    user,
    email,
    loading,
    onEmailChange,
    onChange,
    onSubmit,
    onKeyUp,
    onReset
  } = RegisterPage()
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
        ref={formEl}
        formValue={user}
        autoComplete="off"
        checkTrigger="none"
        onChange={formValue => onChange(formValue)}
      >
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <UserCircle size="16" title="Username" />
            </InputGroup.Addon>
            <FormControl
              size="lg"
              name="username"
              placeholder="Username"
              onKeyPress={onKeyUp}
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
              size="lg"
              name="email"
              type="email"
              placeholder="Email address"
              accepter={AutoComplete}
              data={email}
              onKeyPress={onKeyUp}
              onChange={onEmailChange}
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
              size="lg"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="on"
              onKeyPress={onKeyUp}
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
              size="lg"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              autoComplete="on"
              onKeyPress={onKeyUp}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              appearance="primary"
              size="lg"
              onClick={onSubmit}
              loading={loading}
            >
              Submit
            </Button>
            <Button
              appearance="default"
              size="lg"
              onClick={onReset}
              disabled={loading}
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
