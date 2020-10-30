import { Check } from '@styled-icons/fa-solid'
import { IconStyleWrapper, ProfileSectionTitle } from 'components/Shared/Styles'
import React, { Fragment } from 'react'
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
  experience?: ExperienceType[]
  education?: EducationType[]
}

interface ProfileTopProps {
  profile: ProfileType
}

const ProfileAboutStyled = styled.div.attrs({
  className: 'bg-light mt-4 p-8 text-center'
})`
  border: #ccc solid 1px;
`
const Line = styled.div.attrs({
  className: 'my-6'
})`
  height: 1px;
  background-color: #ccc;
`
const Skills = styled.ul.attrs({
  className: 'flex justify-center'
})``
const Skill = styled.li.attrs({
  className: 'flex items-center p-4'
})``

const ProfileAbout: React.FC<ProfileTopProps> = ({ profile }) => {
  const {
    bio,
    skills,
    user: { username }
  } = profile

  return (
    <ProfileAboutStyled>
      {bio && (
        <Fragment>
          <ProfileSectionTitle>
            {username.split(' ')[0]}'s Bio
          </ProfileSectionTitle>
          <p>{bio}</p>
          <Line />
        </Fragment>
      )}

      <ProfileSectionTitle>Skill Set</ProfileSectionTitle>
      <Skills>
        {skills.slice(0, 5).map((skill, index) => {
          return (
            <Skill key={index}>
              <IconStyleWrapper>
                <Check size="18" />
              </IconStyleWrapper>
              <span>{skill}</span>
            </Skill>
          )
        })}
      </Skills>
    </ProfileAboutStyled>
  )
}

export { ProfileAbout }
