import { User } from '@styled-icons/fa-solid'
import { ProfileForm } from 'components/Profile/ProfileForm'
import React from 'react'
import styled from 'styled-components'
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

const CreateProfile: React.FC = () => (
  <CreateProfilePageStyled>
    <Title>Create Your Profile</Title>

    <Description>
      <User size="24" title="User" />
      <span>Let's get some information to make your profile stand out</span>
    </Description>

    <Instruction>* = required field</Instruction>

    <ProfileForm edit={false} />
  </CreateProfilePageStyled>
)

export { CreateProfile }
