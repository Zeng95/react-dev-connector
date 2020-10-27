import { AppLoader } from 'components/Loader'
import { PageStyled } from 'components/Shared/Styles'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from 'rsuite'

const Profile: React.FC = () => {
  const history = useHistory()
  const { userId } = useParams()

  const { state, actions } = useContext(ProfileContext)
  const { loading, profile } = state
  const { getUserProfileByUserId } = actions

  const getPorfileById = useCallback(getUserProfileByUserId, [])

  const navigateToProfiles = () => {
    history.push('/profiles')
  }

  useEffect(() => {
    getPorfileById(userId)
  }, [getPorfileById, userId])

  return loading || !profile ? (
    <AppLoader />
  ) : (
    <PageStyled>
      <Button onClick={navigateToProfiles}>Back To Profiles</Button>
    </PageStyled>
  )
}

export { Profile }
