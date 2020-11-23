import { Title } from 'components/Shared/Styles'
import React from 'react'
import { Avatar, Icon } from 'rsuite'
import styled from 'styled-components'
import tw from 'twin.macro'

interface UserType {
  avatar: string
  username: string
}

interface SocialType {
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instagram: string
  weibo: string
}

interface ProfileTopProps {
  profile: {
    status: string
    company: string
    website: string
    location: string
    social?: SocialType
    user: UserType
  }
}

const ProfileTopStyled = styled.section.attrs({
  className: 'flex flex-col items-center bg-primary p-8 text-white'
})``
const UserAvatar = styled(Avatar).attrs({
  className: 'my-4'
})`
  width: 250px;
  height: 250px;

  > img {
    width: 100% !important;
    height: 100% !important;
  }
`
const UserName = styled(Title)`
  color: white;
`
const JobDescription = styled.p.attrs({
  className: 'mb-4'
})`
  span {
    &:first-of-type {
      ${tw`mr-1`}
    }
  }
`
const JobLocation = styled.p``
const SocialMediaIcons = styled.div.attrs({
  className: 'flex items-center my-4'
})``
const Link = styled.a.attrs({
  className: 'mx-2'
})``

const ProfileTop: React.FC<ProfileTopProps> = ({ profile }) => {
  const {
    user: { avatar, username },
    website,
    status,
    company,
    location,
    social
  } = profile

  return (
    <ProfileTopStyled>
      <UserAvatar circle src={avatar} alt={`${username} profile image`} />

      <UserName>{username}</UserName>

      <JobDescription>
        <span>{status}</span>
        {company && <span>at {company}</span>}
      </JobDescription>

      {location && <JobLocation>{location}</JobLocation>}

      {social || website ? (
        <SocialMediaIcons>
          {website && (
            <Link href={website} target="_blank">
              <Icon icon="globe2" size="2x" />
            </Link>
          )}

          {social && social.twitter && (
            <Link href={social.twitter} target="_blank">
              <Icon icon="twitter" size="2x" />
            </Link>
          )}

          {social && social.facebook && (
            <Link href={social.facebook} target="_blank">
              <Icon icon="facebook-official" size="2x" />
            </Link>
          )}

          {social && social.linkedin && (
            <Link href={social.linkedin} target="_blank">
              <Icon icon="linkedin-square" size="2x" />
            </Link>
          )}

          {social && social.youtube && (
            <Link href={social.youtube} target="_blank">
              <Icon icon="youtube-play" size="2x" />
            </Link>
          )}

          {social && social.instagram && (
            <Link href={social.instagram} target="_blank">
              <Icon icon="instagram" size="2x" />
            </Link>
          )}

          {social && social.weibo && (
            <Link href={social.weibo} target="_blank">
              <Icon icon="weibo" size="2x" />
            </Link>
          )}
        </SocialMediaIcons>
      ) : null}
    </ProfileTopStyled>
  )
}

export { ProfileTop }
