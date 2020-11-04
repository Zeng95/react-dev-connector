import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock, UserCircle } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyleWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { RegisterPage } from 'hooks/useRegister'
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
  HelpBlock,
  InputGroup,
  Schema
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const ControlLabelStyled = styled(ControlLabel).attrs({
  className: 'relative font-semibold'
})`
  &::after {
    ${tw`absolute`}

    content: '*';
    top: 50%;
    transform: translate3d(0, -9px, 0);
    padding-left: 5px;
    color: #cb2431;
  }
`
const Callout = styled.p.attrs({
  className: 'my-4'
})`
  > a {
    ${tw`ml-1`}
  }
`

const Register: React.FC = () => {
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
  } = RegisterPage()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address')
      .isRequired('This field is required'),
    username: StringType().isRequired('This field is required'),
    password: StringType()
      .minLength(6, 'Minimum 6 characters required')
      .isRequired('This field is required'),
    confirmPassword: StringType()
      .addRule((value, data) => {
        if (value !== data.password) return false

        return true
      }, 'The two passwords do not match')
      .isRequired('This field is required')
  })

  return (
    <PageStyled>
      <Title>Register</Title>

      <Description>
        <IconStyleWrapper>
          <ReactLogo size="24" />
        </IconStyleWrapper>
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
          <ControlLabelStyled>Username</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="username" onKeyPress={onKeyUp} />
            <InputGroup.Addon>
              <UserCircle size="16" title="Username" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Email address</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              accepter={AutoComplete}
              data={email}
              onKeyPress={onKeyUp}
              onChange={onEmailChange}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email address" />
            </InputGroup.Addon>
          </InputGroup>
          <HelpBlock>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Password</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              autoComplete="on"
              onKeyPress={onKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Confirm password</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="confirmPassword"
              type="password"
              autoComplete="on"
              onKeyPress={onKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Confirm password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <Button
              appearance="primary"
              onClick={onSubmit}
              loading={submitLoading}
            >
              Submit
            </Button>
            <Button
              appearance="default"
              onClick={onReset}
              disabled={submitLoading}
            >
              Clear
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <Callout>
        Already have an account?
        <Link to="/login" className="text-primary">
          <strong>Log in</strong>
        </Link>
      </Callout>
    </PageStyled>
  )
}

export { Register }
