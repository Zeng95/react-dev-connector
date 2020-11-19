import { Book, Certificate, University } from '@styled-icons/fa-solid'
import { CheckboxStyled, DatePickerStyled } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { useProfileEducation } from 'hooks/useProfileEducation'
import React, { useContext } from 'react'
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
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    navigateToDashboard
  } = education

  const profile = useContext(ProfileContext)
  const { submitLoading } = profile.state

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
      onChange={formValue => handleChange(formValue)}
    >
      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>
          School or bootcamp
        </ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="school"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <University size="16" title="School or bootcamp" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>
          Degree or certificate
        </ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="degree"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Certificate size="16" title="Degree or certificate" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>Field of study</ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="fieldofstudy"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Book size="16" title="Field of study" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>From date</ControlLabelStyled>

        {/* DataPicker */}
        <FormControl
          block={true}
          oneTap={true}
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
        {/* Label */}
        <ControlLabelStyled>To date</ControlLabelStyled>

        {/* DataPicker */}
        <FormControl
          block={true}
          oneTap={true}
          size="lg"
          name="to"
          placeholder="YYYY / MM / DD"
          accepter={DatePickerStyled}
          disabled={toDateDisabled}
        />
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled>Program description</ControlLabelStyled>

        {/* Input */}
        <FormControl
          componentClass="textarea"
          rows={5}
          name="description"
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyUp(event, edit)
          }
        />
      </FormGroup>

      <FormGroup>
        <ButtonToolbar className="my-4">
          <Button
            appearance="primary"
            onClick={() => handleSubmit(edit)}
            loading={submitLoading}
          >
            Submit
          </Button>
          <Button
            appearance="default"
            onClick={handleReset}
            disabled={submitLoading}
          >
            Clear
          </Button>
          <Button
            appearance="subtle"
            onClick={navigateToDashboard}
            disabled={submitLoading}
          >
            Go Back
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  )
}

export { EducationForm }
