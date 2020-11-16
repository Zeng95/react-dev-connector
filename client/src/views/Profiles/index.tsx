import { Globe } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { ProfileItem } from './ProfileItem'

const ProfileList = styled.ul``
const ProfilesNotFound = styled.h4``

const Profiles: React.FC = () => {
  const profile = useContext(ProfileContext)
  const { profiles, pageLoading } = profile.state
  const { getAllUsersProfiles } = profile.actions

  const getPorfiles = useCallback(getAllUsersProfiles, [])

  useEffect(() => {
    getPorfiles()
  }, [getPorfiles])

  return pageLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Developers</Title>

      <Description>
        <IconStyledWrapper>
          <Globe size="24" />
        </IconStyledWrapper>
        <span>Browse and connect with developers</span>
      </Description>

      {/* Check to make sure that there are profiles */}
      {profiles.length > 0 ? (
        <ProfileList>
          {profiles.map(profile => {
            return <ProfileItem key={profile['_id']} profile={profile} />
          })}
        </ProfileList>
      ) : (
        <ProfilesNotFound>No profiles found...</ProfilesNotFound>
      )}
    </PageStyled>
  )
}

export { Profiles }
