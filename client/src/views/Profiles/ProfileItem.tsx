import { Check } from '@styled-icons/fa-solid'
import { IconStyleWrapper } from 'components/Shared/Styles'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

interface IUser {
  _id: string
  avatar: string
  email: string
  username: string
}

interface IExperience {
  title: string
  company: string
}

interface IEducation {
  school: string
  degree: string
}

interface ISocial {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  weibo: string
}

interface IProfile {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  social?: ISocial
  user: IUser
  experience: IExperience[]
  education: IEducation[]
}

interface ProfileItemProps {
  profile: IProfile
}

const ProfileItemStyled = styled.li``
const LinkStyled = styled(Link).attrs({
  className: 'relative grid items-center mb-6 p-8 bg-white cursor-pointer'
})`
  grid-template-columns: 2fr 4fr 2fr;
  grid-gap: 2rem;
  line-height: 1.8;

  &::before,
  &::after {
    ${tw`absolute top-0 left-0 w-full h-full pointer-events-none`}

    content: '';
    transition: 0.2s ease;
  }

  &::before {
    ${tw`opacity-100`}

    box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1), 0 3px 1px 0 rgba(20, 23, 28, 0.1);
  }

  &::after {
    ${tw`opacity-0`}

    box-shadow: 0 2px 8px 2px rgba(20, 23, 28, 0.15);
  }

  &:hover {
    &::before {
      ${tw`opacity-0`}
    }

    &::after {
      ${tw`opacity-100`}
    }
  }
`

const ProfilePhoto = styled.img.attrs({
  className: 'rounded-full w-full'
})``

const UserInfo = styled.div``
const UserName = styled.h2.attrs({
  className: 'mb-2 font-bold text-2xl'
})``
const JobDescription = styled.p.attrs({
  className: 'mb-4'
})``
const JobLocation = styled.p.attrs({
  className: 'mb-4'
})``
const ButtonStyled = styled(Button)`
  padding: 0.5rem 1.3rem;
`

const UserSkills = styled.ul``
const SkillItem = styled.li.attrs({
  className: 'flex items-center text-primary'
})``

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const history = useHistory()
  const {
    status,
    company,
    location,
    skills,
    user: { _id, avatar, username }
  } = profile

  const navigateToProfile = (userId: string) => {
    history.push(`/profiles/${userId}`)
  }

  return (
    <ProfileItemStyled>
      <LinkStyled to={`/profiles/${_id}`}>
        <ProfilePhoto src={avatar} alt="User Avatar" />

        <UserInfo>
          <UserName>{username}</UserName>

          <JobDescription>
            <span>{status}</span>
            {company && <span>at {company}</span>}
          </JobDescription>

          {location && <JobLocation>{location}</JobLocation>}

          <ButtonStyled
            appearance="primary"
            onClick={() => navigateToProfile(_id)}
          >
            View Profile
          </ButtonStyled>
        </UserInfo>

        <UserSkills>
          {skills.slice(0, 5).map((skill, index) => {
            return (
              <SkillItem key={index}>
                <IconStyleWrapper>
                  <Check size="18" />
                </IconStyleWrapper>
                <span>{skill}</span>
              </SkillItem>
            )
          })}
        </UserSkills>
      </LinkStyled>
    </ProfileItemStyled>
  )
}

export { ProfileItem }
