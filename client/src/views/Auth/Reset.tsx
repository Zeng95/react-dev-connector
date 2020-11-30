import { ReactLogo } from '@styled-icons/fa-brands'
import { Envelope } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'
import {
  AutoComplete,
  Button,
  ButtonToolbar,
  ControlLabel,
  Divider,
  Form,
  FormControl,
  FormGroup,
  InputGroup
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
const ControlButton = styled(Button).attrs({
  className: 'mr-3'
})`
  margin-left: 0 !important;
`

const Reset: React.FC = () => {
  return (
    <PageStyled>
      <Title>Change password for</Title>

      <Divider />

      <Description>
        <IconStyledWrapper>
          <ReactLogo size="24" />
        </IconStyledWrapper>
        <span>Don't worry, happens to the best of us.</span>
      </Description>

      <Form fluid autoComplete="off" checkTrigger="none">
        <FormGroup>
          <ControlLabelStyled>Email address</ControlLabelStyled>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="email" type="email" accepter={AutoComplete} />
            <InputGroup.Addon>
              <Envelope size="16" title="Email Address" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ButtonToolbar>
            <ControlButton appearance="primary">Submit</ControlButton>
            <ControlButton appearance="default">Clear</ControlButton>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </PageStyled>
  )
}

export { Reset }
