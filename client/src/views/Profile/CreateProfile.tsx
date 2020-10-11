import { Github } from '@styled-icons/fa-brands'
import { Building, Globe, MapPin, User, UserCog } from '@styled-icons/fa-solid'
import { ProfilePage } from 'hooks/useProfiles'
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
import tw from 'twin.macro'

const CreateProfilePageStyled = styled.section.attrs({
  className: 'mx-auto px-8'
})`
  max-width: 1100px;
`
const Title = styled.h1.attrs({
  className: 'mb-4 text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
`
const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`
const Instruction = styled.small.attrs({
  className: 'block my-5'
})``
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
  padding-left: 2.5rem !important;
`

const CreateProfile: React.FC = () => {
  const profile = ProfilePage()
  const { StringType } = Schema.Types
  const model = Schema.Model({
    email: StringType()
      .isEmail('Please enter a valid email address.')
      .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.')
  })
  const status = [
    {
      label: 'Developer',
      value: 'A'
    },
    {
      label: 'Junior Developer',
      value: 'B'
    },
    {
      label: 'Senior Developer',
      value: 'C'
    }
  ]

  return (
    <CreateProfilePageStyled>
      <Title>Create Your Profile</Title>

      <Description>
        <User size="24" title="User" />
        <span>Let's get some information to make your profile stand out</span>
      </Description>

      <Instruction>* = required field</Instruction>

      <Form
        fluid
        autoComplete="off"
        checkTrigger="blur"
        model={model}
        onChange={formValue => profile.onChange(formValue)}
      >
        <FormGroup>
          <InputPicker
            data={status}
            placeholder="* Select Professional Status"
            block
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
            Please use comma separated values (eg. HTML, CSS, JavaScript, PHP)
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
            If you want your latest repos and a Github link, include your
            username
          </HelpBlock>
        </FormGroup>

        <FormGroup>
          <FormControl
            componentClass="textarea"
            rows={3}
            name="bio"
            placeholder="A short bio of yourself"
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
                  <IconStyled
                    icon="facebook-square"
                    size="lg"
                    facebook="true"
                  />
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
                  <IconStyled
                    icon="linkedin-square"
                    size="lg"
                    linkedin="true"
                  />
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
          </Fragment>
        )}

        <FormGroup>
          <ButtonToolbar className="my-4">
            <Button appearance="primary" size="lg" onClick={profile.onSubmit}>
              Submit
            </Button>
            <Button appearance="default" size="lg">
              Go Back
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </CreateProfilePageStyled>
  )
}

export { CreateProfile }
