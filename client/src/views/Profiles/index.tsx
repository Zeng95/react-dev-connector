import { Globe } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  List,
  NotFound,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { Divider } from 'rsuite'
import styled from 'styled-components'
import { ProfileItem } from './components/ProfileItem'

const ProfileList = styled(List)``
const ProfilesNotFound = styled(NotFound)``

const Profiles: React.FC = () => {
  const profile = useContext(ProfileContext)
  const { dataLoading: profilesDataLoading, profiles } = profile.state
  const { getAllProfiles } = profile.actions

  const getPorfiles = useCallback(getAllProfiles, [])

  useEffect(() => {
    getPorfiles()
  }, [getPorfiles])

  return profilesDataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Developers</Title>

      <Divider />

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
