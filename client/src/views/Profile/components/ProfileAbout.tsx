import { Check } from '@styled-icons/fa-solid'
import {
  IconStyledWrapper,
  List,
  ProfileSectionTitle
} from 'components/Shared/Styles'
import React, { Fragment } from 'react'
import styled from 'styled-components'

interface ProfileAboutProps {
  profile: {
    bio: string
    skills: string[]
    user: { username: string }
  }
}

const ProfileAboutStyled = styled.section.attrs({
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
const SkillList = styled(List).attrs({
  className: 'grid justify-center'
})`
  grid-template-columns: repeat(5, minmax(0, min-content));
`
const SkillItem = styled.li.attrs({
  className: 'flex items-center p-4'
})``
const SkillName = styled.span.attrs({
  className: 'truncate'
})``

const ProfileAbout: React.FC<ProfileAboutProps> = ({ profile }) => {
  const {
    user: { username },
    bio,
    skills
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

      <ProfileSectionTitle>Skill Sets</ProfileSectionTitle>
      <SkillList>
        {skills.map((skill, index) => {
          return (
            <SkillItem key={index}>
              <IconStyledWrapper>
                <Check size="18" />
              </IconStyledWrapper>
              <SkillName>{skill}</SkillName>
            </SkillItem>
          )
        })}
      </SkillList>
    </ProfileAboutStyled>
  )
}

export { ProfileAbout }
