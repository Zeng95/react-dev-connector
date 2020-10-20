import React from 'react'
import styled from 'styled-components'

const SectionStyled = styled.section``
const SectionTitle = styled.h2.attrs({
  className: 'my-8 text-2xl font-bold'
})``
const SectionContent = styled.div``

const ExperienceSection: React.FC = () => {
  return (
    <SectionStyled>
      <SectionTitle>Experience Credentials</SectionTitle>
      <SectionContent>Content</SectionContent>
    </SectionStyled>
  )
}

export { ExperienceSection }
