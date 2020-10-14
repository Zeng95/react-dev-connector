import { Github } from '@styled-icons/fa-brands'
import { Building, Globe, MapPin, UserCog } from '@styled-icons/fa-solid'
import Weibo from 'assets/images/weibo.svg'
import { ProfilePage } from 'hooks/useProfile'
import React, { Fragment } from 'react'
import {
  Button,
  ButtonToolbar,
  Form,
  FormControl,
  FormGroup,
  HelpBlock,
  Icon,
  InputGroup,
  InputPicker,
  Schema
} from 'rsuite'
import styled, { css } from 'styled-components'

type ProfileFormProps = {
  edit: boolean
}

const InputPickerStyled = styled(InputPicker)`
  .rs-picker-toggle-value {
    color: #575757 !important;
  }
`
const IconStyled = styled(Icon)`
  ${props =>
    props.twitter &&
    css`
      color: #38a1f3;
    `}

  ${props =>
    props.facebook &&
    css`
      color: #3b5998;
    `}

  ${props =>
    props.youtube &&
    css`
      color: #c4302b;
    `}

  ${props =>
    props.linkedin &&
    css`
      color: #0077b5;
    `}

  ${props =>
    props.instagram &&
    css`
      color: #3f729b;
    `}
`
const InputStyled = styled(FormControl)`
  padding-left: 2.8rem !important;
`

const ProfileForm: React.FC<ProfileFormProps> = ({ edit }) => {
  const profile = ProfilePage()
  const { profileForm } = profile
  const { StringType } = Schema.Types
  const model = Schema.Model({
    status: StringType().isRequired('This field is required.'),
    skills: StringType()
      .isRequired('This field is required.')
      .addRule(value => {
        const skills = value.split(',').filter(skill => skill.trim() !== '')

        if (value.indexOf(',') === -1) {
          return false
        }

        if (skills.length < 2) {
          return false
        }

        return true
      }, 'Please enter at least two skills with one comma separated.')
  })
  const status = [
    {
      label: 'Developer',
      value: 'Developer'
    },
    {
      label: 'Junior Developer',
      value: 'Junior Developer'
    },
    {
      label: 'Senior Developer',
      value: 'Senior Developer'
    },
    {
      label: 'Manager',
      value: 'Manager'
    },
    {
      label: 'Student or Learning',
      value: 'Student or Learning'
    },
    {
      label: 'Instructor or Teacher',
      value: 'Instructor or Teacher'
    },
    {
      label: 'Intern',
      value: 'Intern'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ]

  return (
    <Form
      fluid
      model={model}
      ref={profile.formEl}
      formValue={profileForm}
      autoComplete="off"
      checkTrigger="none"
      onChange={formValue => profile.onChange(formValue)}
    >
      <FormGroup>
        <FormControl
          name="status"
          placeholder="* Select Professional Status"
          data={status}
          block={true}
          accepter={InputPickerStyled}
        />
        <HelpBlock>
          Give us an idea of where you are at in your career
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="company" placeholder="Company" />
          <InputGroup.Addon>
            <Building size="16" title="Company" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>Could be your own company or one you work for</HelpBlock>
      </FormGroup>

      <FormGroup>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="website" placeholder="Website" />
          <InputGroup.Addon>
            <Globe size="16" title="Website" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>Could be your own or a company website</HelpBlock>
      </FormGroup>

      <FormGroup>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="location" placeholder="Location" />
          <InputGroup.Addon>
            <MapPin size="16" title="Location" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>City & state suggested (eg. Boston, MA)</HelpBlock>
      </FormGroup>

      <FormGroup>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="skills" placeholder="* Skills" />
          <InputGroup.Addon>
            <UserCog size="16" title="Skills" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl name="githubusername" placeholder="Github Username" />
          <InputGroup.Addon>
            <Github size="16" title="Github Username" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>
          If you want your latest repos and a Github link, include your username
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <FormControl
          name="bio"
          placeholder="A short bio of yourself"
          rows={2}
          componentClass="textarea"
        />
        <HelpBlock>Tell us a little about yourself</HelpBlock>
      </FormGroup>

      <FormGroup>
        <Button
          appearance="default"
          size="lg"
          onClick={profile.toggleSocialInputs}
        >
          Add Social Network Links
        </Button>
        <span className="ml-2">Optional</span>
      </FormGroup>

      {profile.showSocialInputs && (
        <Fragment>
          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="twitter" size="lg" twitter="true" />
              </InputGroup.Addon>
              <InputStyled name="twitter" placeholder="Twitter URL" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="facebook-square" size="lg" facebook="true" />
              </InputGroup.Addon>
              <InputStyled name="facebook" placeholder="Facebook URL" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="youtube-play" size="lg" youtube="true" />
              </InputGroup.Addon>
              <InputStyled name="youtube" placeholder="YouTube URL" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="linkedin-square" size="lg" linkedin="true" />
              </InputGroup.Addon>
              <InputStyled name="linkedin" placeholder="Linkedin URL" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="instagram" size="lg" instagram="true" />
              </InputGroup.Addon>
              <InputStyled name="instagram" placeholder="Instagram URL" />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon={Weibo} size="lg" />
              </InputGroup.Addon>
              <InputStyled name="weibo" placeholder="Weibo URL" />
            </InputGroup>
          </FormGroup>
        </Fragment>
      )}

      <FormGroup>
        <ButtonToolbar className="my-4">
          <Button
            disabled={profileForm.isSubmitting}
            loading={profileForm.isSubmitting}
            appearance="primary"
            size="lg"
            onClick={() => profile.onSubmit(edit)}
          >
            Submit
          </Button>
          <Button
            disabled={profileForm.isSubmitting}
            appearance="default"
            size="lg"
            onClick={profile.onReset}
          >
            Remove
          </Button>
          <Button
            appearance="ghost"
            size="lg"
            onClick={profile.navigateToDashboard}
          >
            Go Back
          </Button>
        </ButtonToolbar>
      </FormGroup>
    </Form>
  )
}

export { ProfileForm }