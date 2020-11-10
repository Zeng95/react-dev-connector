import { GraduationCap } from '@styled-icons/fa-solid'
import {
  PageStyled,
  Title,
  Description,
  IconStyledWrapper,
  Instruction
} from 'components/Shared/Styles'
import React from 'react'
import { EducationForm } from './SharedEducationForm'

const EditEducation: React.FC = () => {
  return (
    <PageStyled>
      <Title>Education</Title>

      <Description>
        <IconStyledWrapper>
          <GraduationCap size="24" title="Add Experience" />
        </IconStyledWrapper>
        <span>Edit any school, bootcamp, etc that you have attended</span>
      </Description>

      <Instruction>* = required field</Instruction>

      <EducationForm edit={true} />
    </PageStyled>
  )
}

export { EditEducation }
