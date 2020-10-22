import { Globe } from '@styled-icons/fa-solid'
import { Description, PageStyled, Title } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { ProfileItem } from './ProfileItem'

const ProfileList = styled.ul``

const Profiles: React.FC = () => {
  const profileState = useContext(ProfileContext).state
  const { profiles } = profileState

  return (
    <PageStyled>
      <Title>Developers</Title>

      <Description>
        <Globe size="24" />
        <span>Browse and connect with developers</span>
      </Description>

      {profiles.length > 0 ? (
        <ProfileList>
          {profiles.map(profile => (
            <ProfileItem />
          ))}
        </ProfileList>
      ) : (
        <h4>No profiles found...</h4>
      )}
    </PageStyled>
  )
}

export { Profiles }
