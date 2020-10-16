import { GraduationCap } from '@styled-icons/fa-solid'
import {
  Description,
  Instruction,
  PageStyled,
  Title
} from 'components/Shared/Styles'
import React from 'react'

const AddEducation: React.FC = () => (
  <PageStyled>
    <Title>Add Your Education</Title>

    <Description>
      <GraduationCap size="24" title="Add Education" />
      <span>Add any school, bootcamp, etc that you have attended</span>
    </Description>

    <Instruction>* = required field</Instruction>
  </PageStyled>
)

export { AddEducation }
