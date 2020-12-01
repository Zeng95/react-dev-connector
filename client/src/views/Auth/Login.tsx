import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { useLogin } from 'hooks/useLogin'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AutoComplete,
  Button,
  ButtonToolbar,
  ControlLabel,
  Divider,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Message,
  Schema
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

interface LocationState {
  from: { pathname: string }
}

const MessageContainer = styled.div.attrs({
  className: 'mb-8'
})``
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
const ControlButton = styled(Button).attrs({
  className: 'mr-3'
})`
  margin-left: 0 !important;
`
const ForgotPassword = styled(Link).attrs({
  className: 'absolute top-0 right-0 text-primary'
})``
const Callout = styled.p.attrs({
  className: 'my-4'
})`
  > a {
    ${tw`ml-1`}

    color: #17a2b8;
  }
`

const Login: React.FC = () => {
  const location = useLocation<LocationState>()
  const { from } = location.state || { from: { pathname: '/dashboard' } }

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state

  const {
    formEl,
    user,
    email,
    message,
    messageType,
    showMessage,
    handleSubmit,
    handleKeyUp,
    handleReset,
    handleChange,
    handleEmailChange,
    handleMessageClose
  } = useLogin()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isRequired('This field is required')
      .isEmail('Please enter a valid email address'),

    password: StringType().isRequired('This field is required')
  })

  return (
    <PageStyled>
      <Title>Welcome back</Title>

      <Divider />

      <Description>
        <IconStyledWrapper>
          <ReactLogo size="24" />
        </IconStyledWrapper>
        <span>Log in to your account</span>
      </Description>

      {showMessage && (
        <MessageContainer>
          <Message
            closable
            showIcon
            type={messageType}
            description={message}
            onClose={handleMessageClose}
          />
        </MessageContainer>
      )}

      <Form
        fluid
        model={model}
        ref={formEl}
        formValue={user}
        autoComplete="off"
        checkTrigger="blur"
        onChange={formValue => handleChange(formValue)}
      >
        <FormGroup>
          <ControlLabelStyled>Email address</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              accepter={AutoComplete}
              data={email}
              onKeyPress={(event: any) => handleKeyUp(event, from)}
              onChange={handleEmailChange}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>
            Password
            <ForgotPassword to="/forgot">Forgot password?</ForgotPassword>
          </ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              autoComplete="on"
              onKeyPress={(event: any) => handleKeyUp(event, from)}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <ControlButton
              appearance="primary"
              onClick={() => handleSubmit(from)}
              loading={submitLoading}
            >
              Submit
            </ControlButton>
            <ControlButton
              appearance="default"
              onClick={handleReset}
              disabled={submitLoading}
            >
              Clear
            </ControlButton>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <Callout>
        New to DevConnector?
        <Link to="/register">
          <strong>Create an account</strong>
        </Link>
      </Callout>
    </PageStyled>
  )
}

export { Login }
