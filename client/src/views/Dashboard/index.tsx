import { User } from '@styled-icons/fa-solid'
import { AppLoader } from 'components/Loader'
import {
  Description,
  IconStyleWrapper,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'rsuite'
import { DashboardActions } from 'views/Dashboard/Actions'
import { EducationSection } from './Education'
import { ExperienceSection } from './Experience'

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext)
  const { user, pageLoading: authPageLoading } = authContext.state
  const { userLoad } = authContext.actions

  const profileContext = useContext(ProfileContext)
  const { profile, pageLoading: profilePageLoading } = profileContext.state
  const { getCurrentUserProfile } = profileContext.actions

  const getUser = useCallback(userLoad, [])
  const getProfile = useCallback(getCurrentUserProfile, [])

  useEffect(() => {
    getUser()
    getProfile()
  }, [getUser, getProfile])

  return authPageLoading || profilePageLoading || user === null ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Title>Dashboard</Title>

      <Description>
        <IconStyleWrapper>
          <User size="24" title="User" />
        </IconStyleWrapper>
        <span>Welcome {user.username}</span>
      </Description>

      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <ExperienceSection />
          <EducationSection />
        </Fragment>
      ) : (
        <div>
          <p>You have not set up a profile yet, please add some info</p>
          <Link to="create-profile" className="inline-block mt-4">
            <Button appearance="primary">Create profile</Button>
          </Link>
        </div>
      )}
    </PageStyled>
  )
}

export { Dashboard }
