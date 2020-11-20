import { Check } from '@styled-icons/fa-solid'
import { AppLazyImage } from 'components/LazyImage'
import { IconStyledWrapper } from 'components/Shared/Styles'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'
import { removeChar } from 'utils'

interface ProfileItemProps {
  profile: {
    user: { _id: string; avatar: string; username: string }
    status: string
    company: string
    location: string
    skills: string[]
  }
}

const ProfileItemStyled = styled.li.attrs({
  className: 'relative grid items-center mb-4 p-8 bg-white'
})`
  grid-template-columns: 2fr 4fr 2fr;
  grid-gap: 2rem;
  line-height: 1.8;

  &::before,
  &::after {
    ${tw`absolute top-0 left-0 w-full h-full pointer-events-none`}

    content: '';
    border-radius: 6px;
    transition: all 0.3s ease;
  }

  &::before {
    ${tw`opacity-100`}

    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1), 0 3px 4px 0 rgba(20, 23, 28, 0.1);
  }

  &::after {
    ${tw`opacity-0`}

    box-shadow: 0 2px 12px 2px rgba(20, 23, 28, 0.15);
  }

  &:hover {
    &::before {
      ${tw`opacity-0`}
    }

    &::after {
      ${tw`opacity-100`}
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const UserInfo = styled.div``
const UserName = styled.h2.attrs({
  className: 'mb-2 font-bold text-2xl'
})``
const JobDescription = styled.p.attrs({
  className: 'mb-4'
})`
  > span {
    &:first-of-type {
      ${tw`mr-1`}
    }
  }
`
const JobLocation = styled.p.attrs({
  className: 'mb-4'
})``
const ControlButton = styled(Button)`
  padding: 0.5rem 1.25rem;
`

const UserSkills = styled.ul``
const SkillItem = styled.li.attrs({
  className: 'flex items-center text-primary'
})``

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const history = useHistory()
  const {
    user: { _id, avatar, username },
    status,
    company,
    location,
    skills
  } = profile

  const linkLocation = {
    pathname: `/profiles/${removeChar(username)}`,
    state: { userId: _id }
  }

  const navigateToProfile = () => {
    history.push(linkLocation)
  }

  return (
    <ProfileItemStyled>
      <AppLazyImage
        linkPath={linkLocation}
        src={avatar}
        alt={`${username} profile image`}
      />

      <UserInfo>
        <UserName>{username}</UserName>

        <JobDescription>
          <span>{status}</span>
          {company && <span>at {company}</span>}
        </JobDescription>

        {location && <JobLocation>{location}</JobLocation>}

        {/* View Profile Button */}
        <ControlButton appearance="primary" onClick={navigateToProfile}>
          View Profile
        </ControlButton>
      </UserInfo>

      <UserSkills>
        {skills.slice(0, 4).map((skill, index) => {
          return (
            <SkillItem key={index}>
              <IconStyledWrapper>
                <Check size="18" />
              </IconStyledWrapper>
              <span>{skill}</span>
            </SkillItem>
          )
        })}
      </UserSkills>
    </ProfileItemStyled>
  )
}

export { ProfileItem }
