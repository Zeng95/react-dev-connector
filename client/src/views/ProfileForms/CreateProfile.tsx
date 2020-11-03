import { User } from '@styled-icons/fa-solid'
import { ProfileForm } from 'views/ProfileForms/SharedForm'
import {
  Description,
  IconStyleWrapper,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'

const CreateProfile: React.FC = () => (
  <PageStyled>
    <Title>Create Your Profile</Title>

    <Description>
      <IconStyleWrapper>
        <User size="24" title="User" />
      </IconStyleWrapper>
      <span>Let's get some information to make your profile stand out</span>
    </Description>

    <Instruction>* = required field</Instruction>

    <ProfileForm edit={false} />
  </PageStyled>
)

export { CreateProfile }
