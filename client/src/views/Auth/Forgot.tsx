import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { useForgot } from 'hooks/useForgot'
import React, { useContext } from 'react'
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

const Forgot: React.FC = () => {
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
  } = useForgot()

  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isRequired('This field is required')
      .isEmail('Please enter a valid email address')
  })

  return (
    <PageStyled>
      <Title>Recover password</Title>

      <Divider />

      <Description>
        <IconStyledWrapper>
          <ReactLogo size="24" />
        </IconStyledWrapper>
        <span>Don't worry, happens to the best of us.</span>
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
              onKeyPress={handleKeyUp}
              onChange={handleEmailChange}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
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
    </PageStyled>
  )
}

export { Forgot }
