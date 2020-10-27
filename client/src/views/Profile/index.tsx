import { AppLoader } from 'components/Loader'
import { ProfileContext } from 'context/profile/ProfileContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Profile: React.FC = () => {
  const { userId } = useParams()

  const { state, actions } = useContext(ProfileContext)
  const { loading } = state
  const { getUserProfileByUserId } = actions

  const getPorfileById = useCallback(getUserProfileByUserId, [])

  useEffect(() => {
    getPorfileById(userId)
  }, [getPorfileById, userId])

  return loading ? <AppLoader /> : <div>Profile</div>
}

export { Profile }
