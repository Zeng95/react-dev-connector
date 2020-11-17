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
import { Link } from 'react-router-dom'
import { Button } from 'rsuite'
import { ActionsSection } from 'views/Dashboard/ActionsSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext)
  const { user, pageLoading: authDataLoading } = auth.state

  const profile = useContext(ProfileContext)
  const {
    pageLoading: profileDataLoading,
    profile: singleProfile
  } = profile.state
  const { getCurrentUserProfile } = profile.actions

  const getMyProfile = useCallback(getCurrentUserProfile, [])

  useEffect(() => {
    getMyProfile()
  }, [getMyProfile])

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
          <Link to="/user/create-profile" className="inline-block mt-4">
            <Button appearance="primary">Create profile</Button>
          </Link>
        </div>
      )}
    </PageStyled>
  )
}

export { Dashboard }
