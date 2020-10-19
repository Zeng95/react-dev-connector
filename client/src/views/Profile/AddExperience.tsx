import { Briefcase, Building, CodeBranch, MapPin } from '@styled-icons/fa-solid'
import {
  Description,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AddExperiencePage } from 'hooks/useProfileExperience'
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
  InputGroup,
  Schema
} from 'rsuite'
import styled, { css } from 'styled-components'

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

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`

const AddExperience: React.FC = () => {
  const experience = AddExperiencePage()
  const { experienceForm, submitting, toDateDisabled } = experience

  const { StringType } = Schema.Types
  const model = Schema.Model({
    title: StringType().isRequired('This field is required.'),
    company: StringType().isRequired('This field is required.')
  })

  return (
    <PageStyled>
      <Title>Experience</Title>

      <Description>
        <CodeBranch size="24" title="Add Experience" />
        <span>
          Add any developer/programming positions that you have had in the past
        </span>
      </Description>

      <Instruction>* = required field</Instruction>

      <Form
        fluid
        model={model}
        ref={experience.formEl}
        formValue={experienceForm}
        autoComplete="off"
        checkTrigger="none"
        onChange={formValue => experience.onChange(formValue)}
      >
        <FormGroup>
          <ControlLabel>Job title</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="title" placeholder="* Job title" />
            <InputGroup.Addon>
              <Briefcase size="16" title="Job title" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Company</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="company" placeholder="* Company" />
            <InputGroup.Addon>
              <Building size="16" title="Company" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Location</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="location" placeholder="* Location" />
            <InputGroup.Addon>
              <MapPin size="16" title="Location" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>From date</ControlLabel>
          <FormControl
            block
            size="lg"
            name="from"
            placeholder="YYYY / MM / DD"
            accepter={DatePickerStyled}
          />
        </FormGroup>

        <FormGroup>
          <FormControl
            name="current"
            accepter={CheckboxGroup}
            onChange={() => experience.toggleDisbaled(!toDateDisabled)}
          >
            <CheckboxStyled value="current">Current job</CheckboxStyled>
            <CheckboxStyled hidden={true} />
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>To date</ControlLabel>
          <FormControl
            block
            disabled={toDateDisabled}
            size="lg"
            name="to"
            placeholder="YYYY / MM / DD"
            accepter={DatePickerStyled}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Job description</ControlLabel>
          <FormControl
            name="description"
            componentClass="textarea"
            rows={5}
            placeholder="Job description"
          />
        </FormGroup>

        <FormGroup>
          <ButtonToolbar className="my-4">
            <Button
              disabled={submitting}
              loading={submitting}
              appearance="primary"
              size="lg"
              onClick={experience.onSubmit}
            >
              Submit
            </Button>
            <Button
              disabled={submitting}
              appearance="default"
              size="lg"
              onClick={experience.onReset}
            >
              Remove
            </Button>
            <Button
              disabled={submitting}
              appearance="ghost"
              size="lg"
              onClick={experience.navigateToDashboard}
            >
              Go Back
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </PageStyled>
  )
}

export { AddExperience }
