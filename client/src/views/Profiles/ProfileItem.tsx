import { Check } from '@styled-icons/fa-solid'
import { IconStyleWrapper } from 'components/Shared/Styles'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'rsuite'
import styled from 'styled-components'

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
  instagram: string
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
  experience: ExperienceType[]
  education: EducationType[]
}

interface ProfileItemProps {
  profile: ProfileType
}

const ProfileItemStyled = styled.li.attrs({
  className: 'grid mb-6 bg-light'
})`
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  grid-gap: 2rem;
  padding: 1rem;
  line-height: 1.8;
  border: #ccc solid 1px;
`

const UserAvatar = styled.img.attrs({
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
      <UserAvatar src={avatar} alt="User Avatar" />

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
    </ProfileItemStyled>
  )
}

export { ProfileItem }
