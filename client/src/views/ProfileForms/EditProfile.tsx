import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { ProfileForm } from 'views/ProfileForms/SharedProfileForm'

const EditProfile: React.FC = () => {
  const profile = useContext(ProfileContext)
  const { dataLoading } = profile.state
  const { getCurrentProfile } = profile.actions

  const getMyProfile = useCallback(getCurrentProfile, [])

  useEffect(() => {
    getMyProfile()
  }, [getMyProfile])

  return dataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Edit Your Profile</Title>

      <Description>
        <IconStyledWrapper>
          <User size="24" title="User" />
        </IconStyledWrapper>
        <span>Let's get some information to make your profile stand out</span>
      </Description>

      <ProfileForm edit={true} />
    </PageStyled>
  )
}

export { EditProfile }
