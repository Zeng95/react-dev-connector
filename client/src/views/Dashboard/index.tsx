import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyledWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import { ActionsSection } from 'views/Dashboard/ActionsSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'

const ControlButton = styled(Button).attrs({
  className: 'mt-8'
})``

const Dashboard: React.FC = () => {
  const history = useHistory()

  const auth = useContext(AuthContext)
  const { dataLoading: authDataLoading, user } = auth.state

  const profile = useContext(ProfileContext)
  const {
    dataLoading: profileDataLoading,
    profile: singleProfile
  } = profile.state
  const { getCurrentProfile } = profile.actions

  const getMyProfile = useCallback(getCurrentProfile, [])

  const navigateToCreateProfile = () => {
    history.push('/user/create-profile')
  }

  // 只在页面初始化时运行
  useEffect(() => {
    if (singleProfile === null) {
      getMyProfile()
    }
  }, [singleProfile, getMyProfile])

  return authDataLoading || profileDataLoading || user === null ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Dashboard</Title>

      <Description>
        <IconStyledWrapper>
          <User size="24" title="User" />
        </IconStyledWrapper>
        <span>Welcome {user.username}</span>
      </Description>

      {singleProfile !== null ? (
        <Fragment>
          <ActionsSection />
          <ExperienceSection />
          <EducationSection />
        </Fragment>
      ) : (
        <div>
          <p>You have not set up a profile yet, please add some info</p>
          <ControlButton appearance="primary" onClick={navigateToCreateProfile}>
            Create profile
          </ControlButton>
        </div>
      )}
    </PageStyled>
  )
}

export { Dashboard }
