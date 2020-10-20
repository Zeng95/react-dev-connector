import { User } from '@styled-icons/fa-solid'
import { ProfileForm } from 'views/Profile/ProfileForm'
import {
  Description,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'

const EditProfile: React.FC = () => (
  <PageStyled>
    <Title>Edit Your Profile</Title>

    <Description>
      <User size="24" title="User" />
      <span>Let's get some information to make your profile stand out</span>
    </Description>

    <Instruction>* = required field</Instruction>

    <ProfileForm edit={true} />
  </PageStyled>
)

export { EditProfile }
