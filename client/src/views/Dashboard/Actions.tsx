import { BlackTie } from '@styled-icons/fa-brands'
import { GraduationCap, UserCircle } from '@styled-icons/fa-solid'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

const DashboardButtons = styled.div``
const LinkStyled = styled(Link).attrs({
  className:
    'inline-flex items-center mr-2 px-5 py-2 bg-light text-base text-primary'
})`
  transition: opacity 0.2s ease-in;

  &:hover {
    opacity: 0.8;
  }

  > span {
    ${tw`ml-2`}

    color: #333;
  }
`

const DashboardActions: React.FC = () => (
  <DashboardButtons>
    <LinkStyled to="/edit-profile">
      <UserCircle size="18" />
      <span>Edit Profile</span>
    </LinkStyled>

    <LinkStyled to="/add-experience">
      <BlackTie size="18" />
      <span>Add Experience</span>
    </LinkStyled>

    <LinkStyled to="/add-education">
      <GraduationCap size="18" />
      <span>Add Education</span>
    </LinkStyled>
  </DashboardButtons>
)

export { DashboardActions }
