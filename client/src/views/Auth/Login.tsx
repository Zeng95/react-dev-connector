import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock } from '@styled-icons/fa-solid'
import { Description, PageStyled, Title } from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { LoginPage } from 'hooks/useLogin'
import React, { useContext } from 'react'
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

const Login: React.FC = () => {
  const { state } = useContext(AuthContext)
  const { submitLoading } = state

  const {
    formEl,
    user,
    email,
    onEmailChange,
    onChange,
    onSubmit,
    onKeyUp,
    onReset
  } = LoginPage()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
  })

  return (
    <PageStyled>
      <Title>Log In</Title>

      <Description>
        <ReactLogo size="24" />
        <span>Log in to your account</span>
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
          <ControlLabel>Email address</ControlLabel>
          <InputGroup style={{ width: '100%' }}>
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
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
          <ButtonToolbar>
            <Button
              appearance="primary"
              size="lg"
              onClick={onSubmit}
              loading={submitLoading}
            >
              Submit
            </Button>
            <Button
              appearance="default"
              size="lg"
              onClick={onReset}
              disabled={submitLoading}
            >
              Clear
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
    </PageStyled>
  )
}

export { Login }
