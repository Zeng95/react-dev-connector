import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyleWrapper,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { ProfileForm } from 'views/ProfileForms/SharedForm'

const CreateProfile: React.FC = () => {
  const { state, actions } = useContext(ProfileContext)
  const { pageLoading } = state
  const { getCurrentUserProfile } = actions

  const getCurrentProfile = useCallback(getCurrentUserProfile, [])

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return pageLoading ? (
    <AppLoader />
  ) : (
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
}

export { CreateProfile }
