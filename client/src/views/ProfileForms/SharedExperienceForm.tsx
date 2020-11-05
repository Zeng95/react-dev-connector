import { Briefcase, Building, MapPin } from '@styled-icons/fa-solid'
import { CheckboxStyled, DatePickerStyled } from 'components/Shared/Styles'
import { useProfileExperience } from 'hooks/useProfileExperience'
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
    onSubmit,
    onKeyUp,
    onReset,
    navigateToDashboard
  } = experience

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
      onChange={formValue => experience.onChange(formValue)}
    >
      <FormGroup>
        <ControlLabelStyled required={true}>Job title</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="title"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              onKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Briefcase size="16" title="Job title" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>Company</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="company"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              onKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Building size="16" title="Company" />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>Location</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="location"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              onKeyUp(event, edit)
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
        <ControlLabelStyled>Job description</ControlLabelStyled>
        <FormControl
          componentClass="textarea"
          rows={5}
          name="description"
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
            onKeyUp(event, edit)
          }
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

export { ExperienceForm }
