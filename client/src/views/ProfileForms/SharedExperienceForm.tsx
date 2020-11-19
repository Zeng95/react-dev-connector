import { Briefcase, Building, MapPin } from '@styled-icons/fa-solid'
import { CheckboxStyled, DatePickerStyled } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { useProfileExperience } from 'hooks/useProfileExperience'
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

interface ExperienceFormProps {
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

const ExperienceForm: React.FC<ExperienceFormProps> = ({ edit }) => {
  const experience = useProfileExperience()
  const {
    formEl,
    experienceForm,
    toDateDisabled,
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    navigateToDashboard
  } = experience

  const profile = useContext(ProfileContext)
  const { submitLoading } = profile.state

  const { StringType, DateType } = Schema.Types
  const model = Schema.Model({
    title: StringType().isRequired('This field is required'),
    company: StringType().isRequired('This field is required'),
    location: StringType().isRequired('This field is required'),
    from: DateType().isRequired('This field is required')
  })

  return (
    <Form
      fluid
      model={model}
      ref={formEl}
      formValue={experienceForm}
      autoComplete="off"
      checkTrigger="none"
      onChange={formValue => handleChange(formValue)}
    >
      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>Job title</ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="title"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Briefcase size="16" title="Job title" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>Company</ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="company"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Building size="16" title="Company" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled required={true}>Location</ControlLabelStyled>

        {/* Input */}
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="location"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <MapPin size="16" title="Location" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>From date</ControlLabelStyled>
        <FormControl
          block
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
        <ControlLabelStyled>To date</ControlLabelStyled>
        <FormControl
          block
          disabled={toDateDisabled}
          name="to"
          placeholder="YYYY / MM / DD"
          accepter={DatePickerStyled}
        />
      </FormGroup>

      <FormGroup>
        {/* Label */}
        <ControlLabelStyled>Job description</ControlLabelStyled>

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

export { ExperienceForm }
