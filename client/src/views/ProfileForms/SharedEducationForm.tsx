import { Book, Certificate, University } from '@styled-icons/fa-solid'
import { CheckboxStyled, DatePickerStyled } from 'components/Shared/Styles'
import { useProfileEducation } from 'hooks/useProfileEducation'
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
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

interface EducationFormProps {
  edit: boolean
}

const ControlLabelStyled = styled(ControlLabel).attrs({
  className: 'relative font-semibold'
})`
  ${props =>
    props.required &&
    css`
      &::after {
        ${tw`absolute`}

        content: '*';
        top: 50%;
        transform: translate3d(0, -9px, 0);
        padding-left: 5px;
        color: #cb2431;
      }
    `}
`

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
        <ControlLabelStyled required={true}>
          School or bootcamp
        </ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="school" />
          <InputGroup.Addon>
            <University size="16" title="School or bootcamp" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>
          Degree or certificate
        </ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="degree" />
          <InputGroup.Addon>
            <Certificate size="16" title="Degree or certificate" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>Field of study</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="fieldofstudy" />
          <InputGroup.Addon>
            <Book size="16" title="Field of study" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>From date</ControlLabelStyled>
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
        <ControlLabelStyled>To date</ControlLabelStyled>
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
        <ControlLabelStyled>Program description</ControlLabelStyled>
        <FormControl name="description" componentClass="textarea" rows={5} />
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
