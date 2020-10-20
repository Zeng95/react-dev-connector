import { User } from '@styled-icons/fa-solid'
import { Description, PageStyled, Title } from 'components/Shared/Styles'
import { AuthContext } from 'context/auth/AuthContext'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Loader } from 'rsuite'
import { DashboardActions } from 'views/Dashboard/Actions'
import { EducationSection } from './Education'
import { ExperienceSection } from './Experience'

const Dashboard: React.FC = () => {
  const authState = useContext(AuthContext).state
  const { user, loading } = authState

  const profileState = useContext(ProfileContext).state
  const { profile } = profileState

  return loading ? (
    <Loader center size="lg" content="Loading..." vertical />
  ) : (
    <PageStyled>
      <Title>Dashboard</Title>

      <Description>
        <User size="24" title="User" />
        <span>Welcome {user && user.username}</span>
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
