import { NotFound } from 'components/Shared/Styles'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import {
  Experience,
  ExperienceContainer,
  Subtitle,
  Title
} from './ProfileExperience'

interface EducationType {
  _id: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  description: string
}

interface ProfileEducationProps {
  education: EducationType[]
}

const EducationContainer = styled(ExperienceContainer)`
  margin-right: 0;
`
const Education = styled(Experience)``

const ProfileEducation: React.FC<ProfileEducationProps> = ({ education }) => {
  return (
    <EducationContainer>
      <Title>Education</Title>

      {education.length > 0 ? (
        education.map(item => {
          const {
            _id,
            school,
            degree,
            fieldofstudy,
            from,
            to,
            description
          } = item

          return (
            <Education key={_id}>
              <Subtitle>{school}</Subtitle>
              <p>
                <time>{moment(from).format('YYYY/MM/DD')}</time>
                <span className="mx-1">-</span>
                <time>{!to ? 'Now' : moment(to).format('YYYY/MM/DD')}</time>
              </p>
              <p>
                <strong>Degree: </strong>
                {degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {fieldofstudy}
              </p>
              {description && (
                <p>
                  <strong>Description: </strong>
                  {description}
                </p>
              )}
            </Education>
          )
        })
      ) : (
        <NotFound>No education credentials</NotFound>
      )}
    </EducationContainer>
  )
}

export { ProfileEducation }
