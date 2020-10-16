import { Briefcase, Building, CodeBranch, MapPin } from '@styled-icons/fa-solid'
import {
  Description,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'
import {
  Button,
  ButtonToolbar,
  Checkbox,
  CheckboxGroup,
  ControlLabel,
  DatePicker,
  Form,
  FormControl,
  FormGroup,
  InputGroup
} from 'rsuite'
import styled from 'styled-components'

const DatePickerStyled = styled(DatePicker)`
  .rs-picker-toggle-caret {
    right: 12px !important;
    color: #575757;
  }
`
const CheckboxStyled = styled(Checkbox)`
  label {
    line-height: normal;
  }
`

const AddExperience: React.FC = () => {
  return (
    <PageStyled>
      <Title>Add An Experience</Title>

      <Description>
        <CodeBranch size="24" title="Add Experience" />
        <span>
          Add any developer/programming positions that you have had in the past
        </span>
      </Description>

      <Instruction>* = required field</Instruction>

      <Form fluid autoComplete="off" checkTrigger="none">
        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="title" placeholder="* Job Title" />
            <InputGroup.Addon>
              <Briefcase size="16" title="Job Title" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="company" placeholder="* Company" />
            <InputGroup.Addon>
              <Building size="16" title="Company" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="location" placeholder="Location" />
            <InputGroup.Addon>
              <MapPin size="16" title="Location" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>From Date</ControlLabel>
          <FormControl
            size="lg"
            name="from"
            placeholder="YYYY / MM / DD"
            accepter={DatePickerStyled}
            block
          />
        </FormGroup>

        <FormGroup>
          <FormControl name="current" accepter={CheckboxGroup}>
            <CheckboxStyled value="">Current Job</CheckboxStyled>
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>To Date</ControlLabel>
          <FormControl
            size="lg"
            name="to"
            placeholder="YYYY / MM / DD"
            accepter={DatePickerStyled}
            block
          />
        </FormGroup>

        <FormGroup>
          <FormControl
            name="description"
            componentClass="textarea"
            rows={5}
            placeholder="Job Description"
          />
        </FormGroup>

        <FormGroup>
          <ButtonToolbar className="my-4">
            <Button appearance="primary" size="lg">
              Submit
            </Button>
            <Button appearance="default" size="lg">
              Remove
            </Button>
            <Button appearance="ghost" size="lg">
              Go Back
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </PageStyled>
  )
}

export { AddExperience }
