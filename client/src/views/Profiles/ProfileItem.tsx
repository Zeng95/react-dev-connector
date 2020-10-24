import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type UserType = {
  _id: string
  avatar: string
  email: string
  username: string
}

type ExperienceType = {
  title: string
  company: string
}

type EducationType = {
  school: string
  degree: string
}

type ProfileType = {
  _id: string
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  user: UserType
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instgram: string
  weibo: string
  experience: ExperienceType[]
  education: EducationType[]
}

type ProfileItemProps = {
  profile: ProfileType
}

const ProfileItemStyled = styled.li`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  grid-gap: 2rem;
  padding: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
`

const UserAvatar = styled.img.attrs({
  className: 'rounded-full'
})``

const UserInfo = styled.div``
const UserName = styled.h2``
const JobDescription = styled.p``
const JobLocation = styled.p``

const UserSkills = styled.ul``
const SkillItem = styled.li``

const ProfileItem: React.FC<ProfileItemProps> = ({ profile }) => {
  const { user, status, location, skills } = profile

  return (
    <ProfileItemStyled>
      <UserAvatar src={user.avatar} alt="User Avatar" />

      <UserInfo>
        <UserName>{user.username}</UserName>
        <JobDescription>{status}</JobDescription>
        <JobLocation>{location}</JobLocation>
      </UserInfo>

      <UserSkills>
        {skills.map((skill, index) => (
          <SkillItem key={index}>{skill}</SkillItem>
        ))}
      </UserSkills>

      <Link to={`/profile/${profile['_id']}`}>View Profile</Link>
    </ProfileItemStyled>
  )
}

export { ProfileItem }
