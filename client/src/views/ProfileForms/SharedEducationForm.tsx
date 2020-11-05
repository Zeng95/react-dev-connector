import { University, Book, Certificate } from '@styled-icons/fa-solid'
import { DatePickerStyled, CheckboxStyled } from 'components/Shared/Styles'
import { useProfileEducation } from 'hooks/useProfileEducation'
import React from 'react'
import {
  Schema,
  Form,
  FormGroup,
  ControlLabel,
  InputGroup,
  FormControl,
  CheckboxGroup,
  ButtonToolbar,
  Button
} from 'rsuite'

interface EducationFormProps {
  edit: boolean
}

const EducationForm: React.FC<EducationFormProps> = ({ edit }) => {
  const education = useProfileEducation()
  const {
    educationForm,
    toDateDisabled,
    onSubmit,
    onKeyUp,
    onReset,
    navigateToDashboard
  } = education

  const { StringType, DateType } = Schema.Types
  const model = Schema.Model({
    school: StringType().isRequired('This field is required.'),
    degree: StringType().isRequired('This field is required.'),
    fieldofstudy: StringType().isRequired('This field is required.'),
    from: DateType().isRequired('This field is required.')
  })

  return (
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
          <Button appearance="primary" onClick={() => onSubmit(edit)}>
            Submit
          </Button>
          <Button appearance="default" onClick={onReset}>
            Clear
          </Button>
          <Button appearance="subtle" onClick={navigateToDashboard}>
            Go Back
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  )
}

export { EducationForm }
