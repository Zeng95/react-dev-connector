import { GraduationCap } from '@styled-icons/fa-solid'
import {
  Description,
  IconStyleWrapper,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'
import { EducationForm } from './SharedEducationForm'

const CreateEducation: React.FC = () => {
  return (
    <PageStyled>
      <Title>Education</Title>

      <Description>
        <IconStyleWrapper>
          <GraduationCap size="24" title="Add Experience" />
        </IconStyleWrapper>
        <span>Add any school, bootcamp, etc that you have attended</span>
      </Description>

      <Instruction>* = required field</Instruction>

      <EducationForm edit={false} />
    </PageStyled>
  )
}

export { CreateEducation }
