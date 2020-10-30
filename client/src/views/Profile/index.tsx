import { AppLoader } from 'components/Loader'
import { PageStyled } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { Fragment, useCallback, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import { ProfileAbout } from './ProfileAbout'
import { ProfileTop } from './ProfileTop'

const ProfileGrid = styled.div.attrs({
  className: 'my-4'
})``

const Profile: React.FC = () => {
  const history = useHistory()
  const { userId } = useParams()

  const { state, actions } = useContext(ProfileContext)
  const { pageLoading, profile } = state
  const { getUserProfileByUserId } = actions

  const getPorfileById = useCallback(getUserProfileByUserId, [])

  const navigateToProfiles = () => {
    history.push('/profiles')
  }

  useEffect(() => {
    getPorfileById(userId)
  }, [getPorfileById, userId])

  return pageLoading ? (
    <AppLoader />
  ) : (
    <PageStyled>
      {profile !== null ? (
        <Fragment>
          <Button appearance="ghost" onClick={navigateToProfiles}>
            Back To Profiles
          </Button>

          <ProfileGrid>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </ProfileGrid>
        </Fragment>
      ) : (
        <p>Not found</p>
      )}
    </PageStyled>
  )
}

export { Profile }
