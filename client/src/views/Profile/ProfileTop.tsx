import { Globe } from '@styled-icons/fa-solid'
import Weibo from 'assets/images/weibo.svg'
import { Description, Title } from 'components/Shared/Styles'
import React from 'react'
import { Icon } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

interface UserType {
  _id: string
  avatar: string
  email: string
  username: string
}

interface ExperienceType {
  title: string
  company: string
}

interface EducationType {
  school: string
  degree: string
}

interface SocialType {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instgram: string
  weibo: string
}

interface ProfileType {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  social?: SocialType
  user: UserType
  experience?: ExperienceType[]
  education?: EducationType[]
}

interface ProfileTopProps {
  profile: ProfileType
}

const ProfileTopStyled = styled.div.attrs({
  className: 'flex flex-col items-center bg-primary p-8 text-white'
})``
const UserAvatar = styled.img.attrs({
  className: 'rounded-full my-4'
})`
  width: 250px;
`
const UserName = styled(Title)`
  color: white;
`
const JobDescription = styled(Description)`
  span {
    &:first-of-type {
      ${tw`mr-1`}
    }
  }
`
const JobLocation = styled.p``
const SocialMediaIcons = styled.div.attrs({
  className: 'my-4'
})``
const IconStyled = styled(Icon)``

const ProfileTop: React.FC<ProfileTopProps> = ({ profile }) => {
  const {
    website,
    status,
    company,
    location,
    social,
    user: { avatar, username }
  } = profile

  return (
    <ProfileTopStyled>
      <UserAvatar src={avatar} />
      <UserName>{username}</UserName>
      <JobDescription>
        <span>{status}</span>
        {company && <span>at {company}</span>}
      </JobDescription>
      {location && <JobLocation>{location}</JobLocation>}

      {social || website ? (
        <SocialMediaIcons>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
              <Globe size="32" />
            </a>
          )}
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon icon="twitter" size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
            <Icon icon="facebook-official" size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon icon="linkedin-square" size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon icon="youtube-play" size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon icon="instagram" size="2x" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <IconStyled icon={Weibo} size="2x" />
          </a>
        </SocialMediaIcons>
      ) : null}
    </ProfileTopStyled>
  )
}

export { ProfileTop }
