import { User } from '@styled-icons/fa-solid'
import { AuthContext } from 'contexts/auth/AuthContext'
import { ProfileContext } from 'contexts/profile/ProfileContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.section.attrs({
  className: 'mx-auto px-8'
})`
  max-width: 1100px;
`
const Title = styled.h1.attrs({
  className: 'mb-4 text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
`
const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`

const Dashboard: React.FC = () => {
  const authState = useContext(AuthContext).state
  const { user } = authState

  const profileState = useContext(ProfileContext).state
  const { profile } = profileState

  return (
    <Container>
      <Title>Dashboard</Title>

      <Description>
        <User size="24" title="User" />
        <span>Welcome {user && user.username}</span>
      </Description>

      {profile ? (
        <div className="dash-buttons">
          <a href="edit-profile.html" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i>
            <span>Edit Profile</span>
          </a>
          <a href="add-experience.html" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </a>
          <a href="add-education.html" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </a>
        </div>
      ) : (
        <div>
          <p>You have not set up a profile yet, please add some info</p>
          <Link to="create-profile" className="inline-block mt-4">
            <Button appearance="primary">Create profile</Button>
          </Link>
        </div>
      )}
    </Container>
  )
}

export { Dashboard }
