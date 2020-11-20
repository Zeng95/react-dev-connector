import { AppLoader } from 'components/Loader'
import { PageStyled } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import { ProfileAbout } from './components/ProfileAbout'
import { ProfileEducation } from './components/ProfileEducation'
import { ProfileExperience } from './components/ProfileExperience'
import { ProfileTop } from './components/ProfileTop'

interface LocationState {
  userId: string
}

const ProfileGrid = styled.div.attrs({
  className: 'my-4'
})``
const SectionContainer = styled.section.attrs({
  className: 'flex mt-4'
})``

const Profile: React.FC = () => {
  const history = useHistory()
  const location = useLocation<LocationState>()
  const { userId } = location.state

  const profile = useContext(ProfileContext)
  const {
    dataLoading: profileDataLoading,
    profile: singleProfile
  } = profile.state
  const { getSignleProfile } = profile.actions

  const getPorfileById = useCallback(getSignleProfile, [])

  const navigateToProfiles = () => {
    history.push('/profiles')
  }

  useEffect(() => {
    getPorfileById(userId)
  }, [getPorfileById, userId])

  return profileDataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      {singleProfile !== null ? (
        <Fragment>
          <Button appearance="ghost" onClick={navigateToProfiles}>
            Back To Profiles
          </Button>

          <ProfileGrid>
            <ProfileTop profile={singleProfile} />

            <ProfileAbout profile={singleProfile} />

            <SectionContainer>
              <ProfileExperience experience={singleProfile.experience} />
              <ProfileEducation education={singleProfile.education} />
            </SectionContainer>
          </ProfileGrid>
        </Fragment>
      ) : (
        <h4>No profile credentials</h4>
      )}
    </PageStyled>
  )
}

export { Profile }
