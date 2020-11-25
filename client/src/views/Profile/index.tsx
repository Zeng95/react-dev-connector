import { AppLoader } from 'components/Loader'
import { PageStyled } from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, ButtonToolbar } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ProfileAbout } from './components/ProfileAbout'
import { ProfileEducation } from './components/ProfileEducation'
import { ProfileExperience } from './components/ProfileExperience'
import { ProfileGithub } from './components/ProfileGithub'
import { ProfileTop } from './components/ProfileTop'

interface LocationState {
  userId: string
}

const ButtonToolbarStyled = styled(ButtonToolbar)`
  & > :not(:first-child):not(.rs-btn-block) {
    ${tw`ml-3`}
  }
`
const ProfileGrid = styled.div.attrs({
  className: 'my-4'
})``
const SectionContainer = styled.section.attrs({
  className: 'flex mt-4'
})``

const Profile: React.FC = () => {
  const history = useHistory()
  const location = useLocation<LocationState>()
  const { state } = location
  const hasLocationState = typeof state === 'object' && state !== null

  const auth = useContext(AuthContext)
  const { isAuthenticated, user } = auth.state

  const profile = useContext(ProfileContext)
  const {
    dataLoading: profileDataLoading,
    profile: singleProfile
  } = profile.state
  const { getSingleProfile, getUserGithubRepos } = profile.actions

  const getPorfileById = useCallback(getSingleProfile, [])
  const getGithubRepos = useCallback(getUserGithubRepos, [])

  const navigateToProfiles = () => {
    history.push('/profiles')
  }

  const navigateToEditProfile = () => {
    history.push('/user/edit-profile')
  }

  useEffect(() => {
    const sendReuqests = async () => {
      const profile = await getPorfileById(state.userId)

      if (profile.githubusername) {
        await getGithubRepos(profile.githubusername)
      }
    }

    if (hasLocationState) {
      sendReuqests()
    } else {
      history.replace('/login')
    }
  }, [getPorfileById, getGithubRepos, hasLocationState, state, history])

  return profileDataLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      {singleProfile !== null ? (
        <Fragment>
          <ButtonToolbarStyled>
            <Button appearance="ghost" onClick={navigateToProfiles}>
              Back To Profiles
            </Button>

            {isAuthenticated && user !== null && user['_id'] === state.userId && (
              <Button appearance="default" onClick={navigateToEditProfile}>
                Edit Profile
              </Button>
            )}
          </ButtonToolbarStyled>

          <ProfileGrid>
            <ProfileTop profile={singleProfile} />

            <ProfileAbout profile={singleProfile} />

            <SectionContainer>
              <ProfileExperience experience={singleProfile.experience} />
              <ProfileEducation education={singleProfile.education} />
            </SectionContainer>

            <ProfileGithub />
          </ProfileGrid>
        </Fragment>
      ) : (
        <h4>No profile credentials</h4>
      )}
    </PageStyled>
  )
}

export { Profile }
