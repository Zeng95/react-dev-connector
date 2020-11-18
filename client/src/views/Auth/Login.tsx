import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope, Lock } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { LoginPage } from 'hooks/useLogin'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import styled from 'styled-components'
import tw from 'twin.macro'

interface LocationState {
  from: {
    pathname: string
  }
}

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
const FormButton = styled(Button).attrs({
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

const Login: React.FC = () => {
  const location = useLocation<LocationState>()
  const { from } = location.state || { from: { pathname: '/dashboard' } }

  const auth = useContext(AuthContext)
  const { submitLoading } = auth.state

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
      .isEmail('Please enter a valid email address')
      .isRequired('This field is required'),
    password: StringType().isRequired('This field is required')
  })

  return (
    <PageStyled>
      <Title>Welcome</Title>

      <Description>
        <IconStyledWrapper>
          <ReactLogo size="24" />
        </IconStyledWrapper>
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
          <ControlLabelStyled>Email address</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="email"
              type="email"
              accepter={AutoComplete}
              data={email}
              onKeyPress={(event: any) => onKeyUp(event, from)}
              onChange={onEmailChange}
            />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabelStyled>Password</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl
              name="password"
              type="password"
              autoComplete="on"
              onKeyPress={(event: any) => onKeyUp(event, from)}
            />
            <InputGroup.Addon>
              <Lock size="16" title="Password" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <FormButton
              appearance="primary"
              onClick={() => onSubmit(from)}
              loading={submitLoading}
            >
              Submit
            </FormButton>
            <FormButton
              appearance="default"
              onClick={onReset}
              disabled={submitLoading}
            >
              Clear
            </FormButton>
          </ButtonToolbar>
        </FormGroup>
      </Form>

      <Callout>
        New to DevConnector?
        <Link to="/register" className="text-primary">
          <strong>Create an account</strong>
        </Link>
      </Callout>
    </PageStyled>
  )
}

export { Login }
