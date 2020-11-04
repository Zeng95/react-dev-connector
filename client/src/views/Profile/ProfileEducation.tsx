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
  to: string | null
  description: string
}

interface ProfileEducationProps {
  education: EducationType[]
}

const EducationContainer = styled(ExperienceContainer)``
const Education = styled(Experience)``

const ProfileEducation: React.FC<ProfileEducationProps> = ({ education }) => {
  return (
    <EducationContainer>
      <Title>Education</Title>

      {education.length > 0 ? (
        education.map(item => {
          const {
            _id: id,
            school,
            degree,
            fieldofstudy,
            from,
            to,
            description
          } = item

          return (
            <Education key={id}>
              <Subtitle>{school}</Subtitle>
              <p>
                {moment(from).format('YYYY/MM/DD')} -{' '}
                {!to ? 'Now' : moment(to).format('YYYY/MM/DD')}
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
        <h4>No education credentials</h4>
      )}
    </EducationContainer>
  )
}

export { ProfileEducation }
