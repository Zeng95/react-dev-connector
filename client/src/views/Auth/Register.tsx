import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock, UserCircle } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { useRegister } from 'hooks/useRegister'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  AutoComplete,
  Button,
  ButtonToolbar,
  ControlLabel,
  Divider,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  InputGroup,
  Message,
  Schema
} from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

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
const Callout = styled.p.attrs({
  className: 'my-4'
})`
  > a {
    ${tw`ml-1`}
  }
`

const Register: React.FC = () => {
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
    handleMessageClose,
    asyncCheckUsername,
    asyncCheckEmail
  } = useRegister()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    username: StringType()
      .isRequired('This field is required')
      .minLength(2, 'Minimum 2 characters required')
      .addRule((value, data) => {
        if (value === data.username) {
          return asyncCheckUsername(value)
        }
      }, `Username ${user.username} is not available`),

    email: StringType()
      .isRequired('This field is required')
      .isEmail('Please enter a valid email address')
      .addRule((value, data) => {
        if (value === data.email) {
          return asyncCheckEmail(value)
        }
      }, 'Email has already been taken'),

    password: StringType()
      .isRequired('This field is required')
      .minLength(16, 'Minimum 16 characters required'),

    confirmPassword: StringType()
      .isRequired('This field is required')
      .addRule((value, data) => {
        if (value !== data.password) return false

        return true
      }, 'The two passwords do not match')
  })

  return (
    <PageStyled>
      <Title>Join now</Title>

      <Divider />

      <Description>
        <IconStyledWrapper>
          <ReactLogo size="24" />
        </IconStyledWrapper>
        <span>Sign up for free and experience DevConnector today</span>
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
          <ControlLabelStyled>Username</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="username" checkAsync onKeyPress={handleKeyUp} />
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
              checkAsync
              accepter={AutoComplete}
              data={email}
              onKeyPress={handleKeyUp}
              onChange={handleEmailChange}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email address" />
            </InputGroup.Addon>
          </InputGroup>
          <HelpBlock>This site uses Gravatar for a profile image</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Password</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              autoComplete="on"
              onKeyPress={handleKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
          <HelpBlock>Must have at least 16 characters</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Confirm password</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="confirmPassword"
              type="password"
              autoComplete="on"
              onKeyPress={handleKeyUp}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Confirm password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <ControlButton
              appearance="primary"
              onClick={handleSubmit}
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
        Already have an account?
        <Link to="/login" className="text-primary">
          <strong>Log in</strong>
        </Link>
      </Callout>
    </PageStyled>
  )
}

export { Register }
