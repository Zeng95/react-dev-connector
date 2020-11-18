import { Github } from '@styled-icons/fa-brands'
import { Building, Globe, MapPin, UserCog } from '@styled-icons/fa-solid'
import Weibo from 'assets/images/weibo.svg'
import { ProfileContext } from 'context/profile/ProfileContext'
import { useProfile } from 'hooks/useProfile'
import React, { useContext } from 'react'
import {
  Animation,
  Button,
  ButtonToolbar,
  ControlLabel,
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
import tw from 'twin.macro'

interface ProfileFormProps {
  edit: boolean
}

const { Collapse } = Animation
const SocialInputsContainer = styled.div``
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

const ProfileForm: React.FC<ProfileFormProps> = ({ edit }) => {
  const {
    formEl,
    profileForm,
    showSocialInputs,
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    toggleSocialInputs,
    navigateToDashboard
  } = useProfile()

  const profile = useContext(ProfileContext)
  const { submitLoading } = profile.state

  const { StringType } = Schema.Types
  const model = Schema.Model({
    status: StringType().isRequired('This field is required'),
    skills: StringType()
      .isRequired('This field is required')
      .addRule(value => {
        const skills = value.split(',').filter(skill => skill.trim() !== '')

        if (value.indexOf(',') === -1) {
          return false
        }

        if (skills.length < 2) {
          return false
        }

        return true
      }, 'Please enter at least two skills with one comma separated')
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
      label: 'Data Scientist',
      value: 'Data Scientist'
    },
    {
      label: 'Designer',
      value: 'Designer'
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
      ref={formEl}
      formValue={profileForm}
      autoComplete="off"
      checkTrigger="none"
      onChange={formValue => handleChange(formValue)}
    >
      <FormGroup>
        <ControlLabelStyled required={true}>
          Professional Status
        </ControlLabelStyled>
        <FormControl
          name="status"
          data={status}
          block={true}
          accepter={InputPickerStyled}
        />
        <HelpBlock>
          Give us an idea of where you are at in your career
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled>Company</ControlLabelStyled>
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
        <HelpBlock>Could be your own company or one you work for</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled>Website</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="website"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Globe size="16" title="Website" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>Could be your own or a company website</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled>Location</ControlLabelStyled>
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
        <HelpBlock>City & state suggested (eg. Boston, MA)</HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled required={true}>Skills</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="skills"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <UserCog size="16" title="Skills" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>
          Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled>Github Username</ControlLabelStyled>
        <InputGroup inside style={{ width: '100%' }}>
          <FormControl
            name="githubusername"
            onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyUp(event, edit)
            }
          />
          <InputGroup.Addon>
            <Github size="16" title="Github Username" />
          </InputGroup.Addon>
        </InputGroup>
        <HelpBlock>
          If you want your latest repos and a Github link, include your username
        </HelpBlock>
      </FormGroup>

      <FormGroup>
        <ControlLabelStyled>Bio</ControlLabelStyled>
        <FormControl
          rows={2}
          componentClass="textarea"
          name="bio"
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyUp(event, edit)
          }
        />
        <HelpBlock>Tell us a little about yourself</HelpBlock>
      </FormGroup>

      <FormGroup>
        <Button appearance="default" onClick={toggleSocialInputs}>
          Add Social Network Links
        </Button>
        <span className="ml-2">Optional</span>
      </FormGroup>

      <Collapse in={showSocialInputs}>
        <SocialInputsContainer>
          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="twitter" size="lg" twitter="true" />
              </InputGroup.Addon>
              <InputStyled
                name="twitter"
                placeholder="Twitter URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="facebook-square" size="lg" facebook="true" />
              </InputGroup.Addon>
              <InputStyled
                name="facebook"
                placeholder="Facebook URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="youtube-play" size="lg" youtube="true" />
              </InputGroup.Addon>
              <InputStyled
                name="youtube"
                placeholder="YouTube URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="linkedin-square" size="lg" linkedin="true" />
              </InputGroup.Addon>
              <InputStyled
                name="linkedin"
                placeholder="Linkedin URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon="instagram" size="lg" instagram="true" />
              </InputGroup.Addon>
              <InputStyled
                name="instagram"
                placeholder="Instagram URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup inside style={{ width: '100%' }}>
              <InputGroup.Addon>
                <IconStyled icon={Weibo} size="lg" />
              </InputGroup.Addon>
              <InputStyled
                name="weibo"
                placeholder="Weibo URL"
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyUp(event, edit)
                }
              />
            </InputGroup>
          </FormGroup>
        </SocialInputsContainer>
      </Collapse>

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

export { ProfileForm }
