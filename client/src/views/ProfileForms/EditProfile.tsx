import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyleWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { ProfileForm } from 'views/ProfileForms/SharedProfileForm'

const EditProfile: React.FC = () => {
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
      <Title>Edit Your Profile</Title>

      <Description>
        <IconStyleWrapper>
          <User size="24" title="User" />
        </IconStyleWrapper>
        <span>Let's get some information to make your profile stand out</span>
      </Description>

      <ProfileForm edit={true} />
    </PageStyled>
  )
}

export { EditProfile }
