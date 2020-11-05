import { CodeBranch } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyleWrapper,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'
import { ExperienceForm } from './SharedExperienceForm'

const CreateExperience: React.FC = () => {
  return (
    <PageStyled>
      <Title>Experience</Title>

      <Description>
        <IconStyleWrapper>
          <CodeBranch size="24" title="Add Experience" />
        </IconStyleWrapper>
        <span>
          Add any developer/programming positions that you have had in the past
        </span>
      </Description>

      <Instruction>* = required field</Instruction>

      <ExperienceForm edit={false} />
    </PageStyled>
  )
}

export { CreateExperience }
