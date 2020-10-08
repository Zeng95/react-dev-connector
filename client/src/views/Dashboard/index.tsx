import { User } from '@styled-icons/fa-solid'
import { AuthContext } from 'context/AuthContext'
// import { ProfileContext } from 'context/ProfileContext'
// import { DashboardPage } from 'hooks/useProfiles'
import React, { useContext } from 'react'
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
  return (
    <Container>
      <Title>Dashboard</Title>

      <Description>
        <User size="24" title="User" />
        <span>Welcome</span>
      </Description>

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
    </Container>
  )
}

export { Dashboard }
