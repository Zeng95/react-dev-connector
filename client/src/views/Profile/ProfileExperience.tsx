import { ProfileSectionTitle } from 'components/Shared/Styles'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

interface ExperienceType {
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string | null
  description: string
}

interface ProfileExperienceProps {
  experience: ExperienceType[]
}

export const ExperienceContainer = styled.div.attrs({
  className: 'p-8 w-2/4'
})`
  color: #333;
  border: 1px solid #ccc;
`
export const Title = styled(ProfileSectionTitle)`
  margin-bottom: 1rem;
`
export const Subtitle = styled.h3.attrs({
  className: 'font-bold text-dark text-xl'
})``
export const Experience = styled.div`
  p {
    margin: 0.5rem 0;
  }
`

const ProfileExperience: React.FC<ProfileExperienceProps> = ({
  experience
}) => {
  return (
    <ExperienceContainer>
      <Title>Experience</Title>

      {experience.length > 0 ? (
        experience.map(item => {
          const { _id: id, title, company, description, from, to } = item

          return (
            <Experience key={id}>
              <Subtitle>{company}</Subtitle>
              <p>
                {moment(from).format('YYYY/MM/DD')} -{' '}
                {!to ? 'Now' : moment(to).format('YYYY/MM/DD')}
              </p>
              <p>
                <strong>Position: </strong>
                {title}
              </p>
              {description && (
                <p>
                  <strong>Description: </strong>
                  {description}
                </p>
              )}
            </Experience>
          )
        })
      ) : (
        <h4>No experience credentials</h4>
      )}
    </ExperienceContainer>
  )
}

export { ProfileExperience }
