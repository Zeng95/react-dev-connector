import { Globe } from '@styled-icons/fa-solid'
import { Description, PageStyled, Title } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { Loader } from 'rsuite'
import styled from 'styled-components'
import { ProfileItem } from './ProfileItem'

const ProfileList = styled.ul``
const ProfilesNotFound = styled.h4``

const Profiles: React.FC = () => {
  const { state, actions } = useContext(ProfileContext)
  const { profiles, loading } = state
  const { getAllUsersProfiles } = actions

  const getPorfiles = useCallback(getAllUsersProfiles, [])

  useEffect(() => {
    getPorfiles()
  }, [getPorfiles])

  return loading ? (
    <Loader center size="lg" content="Loading..." vertical />
  ) : (
    <PageStyled>
      <Title>Developers</Title>

      <Description>
        <Globe size="24" />
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
