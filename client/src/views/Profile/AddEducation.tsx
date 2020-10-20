import {
  Book,
  Certificate,
  GraduationCap,
  University
} from '@styled-icons/fa-solid'
import {
  CheckboxStyled,
  DatePickerStyled,
  Description,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AddEducationPage } from 'hooks/useProfileEducation'
import React from 'react'
import {
  Button,
  ButtonToolbar,
  CheckboxGroup,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Schema
} from 'rsuite'

const AddEducation: React.FC = () => {
  const education = AddEducationPage()
  const { educationForm, submitting, toDateDisabled } = education

  const { StringType, DateType } = Schema.Types
  const model = Schema.Model({
    school: StringType().isRequired('This field is required.'),
    degree: StringType().isRequired('This field is required.'),
    fieldofstudy: StringType().isRequired('This field is required.'),
    from: DateType().isRequired('This field is required.')
  })

  return (
    <PageStyled>
      <Title>Education</Title>

      <Description>
        <GraduationCap size="24" title="Add Experience" />
        <span>Add any school, bootcamp, etc that you have attended</span>
      </Description>

      <Instruction>* = required field</Instruction>

      <Form
        fluid
        model={model}
        ref={education.formEl}
        formValue={educationForm}
        autoComplete="off"
        checkTrigger="none"
        onChange={formValue => education.onChange(formValue)}
      >
        <FormGroup>
          <ControlLabel>School or bootcamp</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="school" placeholder="* School or bootcamp" />
            <InputGroup.Addon>
              <University size="16" title="School or bootcamp" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Degree or certificate</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="degree" placeholder="* Degree or certificate" />
            <InputGroup.Addon>
              <Certificate size="16" title="Degree or certificate" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Field of study</ControlLabel>
          <InputGroup inside style={{ width: '100%' }}>
            <FormControl name="fieldofstudy" placeholder="* Field of study" />
            <InputGroup.Addon>
              <Book size="16" title="Field of study" />
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
            onChange={() => education.toggleDisbaled(!toDateDisabled)}
          >
            <CheckboxStyled value="current">
              Current school or bootcamp
            </CheckboxStyled>
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
          <ControlLabel>Program description</ControlLabel>
          <FormControl
            name="description"
            componentClass="textarea"
            rows={5}
            placeholder="Program description"
          />
        </FormGroup>

        <FormGroup>
          <ButtonToolbar className="my-4">
            <Button
              disabled={submitting}
              loading={submitting}
              appearance="primary"
              size="lg"
              onClick={education.onSubmit}
            >
              Submit
            </Button>
            <Button
              disabled={submitting}
              appearance="default"
              size="lg"
              onClick={education.onReset}
            >
              Clear
            </Button>
            <Button
              disabled={submitting}
              appearance="ghost"
              size="lg"
              onClick={education.navigateToDashboard}
            >
              Go Back
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </PageStyled>
  )
}

export { AddEducation }
