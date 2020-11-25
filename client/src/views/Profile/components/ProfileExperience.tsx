import { NotFound, ProfileSectionTitle } from 'components/Shared/Styles'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

interface ExperienceType {
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string
  description: string
}

interface ProfileExperienceProps {
  experience: ExperienceType[]
}

export const ExperienceContainer = styled.div.attrs({
  className: 'mr-4 p-8 w-2/4'
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
export const Experience = styled.div.attrs({
  className: 'mb-4 pb-4'
})`
  border-bottom: #ccc 1px dotted;

  &:last-child {
    border: 0;
  }

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
          const { _id, title, company, location, description, from, to } = item

          return (
            <Experience key={_id}>
              <Subtitle>{company}</Subtitle>
              <p>
                <time>{moment(from).format('YYYY/MM/DD')}</time>
                <span className="mx-1">-</span>
                <time>{!to ? 'Now' : moment(to).format('YYYY/MM/DD')}</time>
              </p>
              <p>
                <strong>Location: </strong>
                {location}
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
        <NotFound>No experience credentials</NotFound>
      )}
    </ExperienceContainer>
  )
}

export { ProfileExperience }
