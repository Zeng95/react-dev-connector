import styled from 'styled-components'
import tw from 'twin.macro'

export const AppContent = styled.main.attrs({
  className: 'mt-24 mb-12'
})``

export const PageStyled = styled.section.attrs({
  className: 'mx-auto px-40'
})`
  max-width: 1100px;
`

export const Title = styled.h1.attrs({
  className: 'mb-4 text-primary'
})`
  font-size: 3rem;
  line-height: 1.2;
`

export const Description = styled.p.attrs({
  className: 'flex items-center mb-4 text-2xl'
})`
  span {
    ${tw`ml-2`}
  }
`

export const Instruction = styled.small.attrs({
  className: 'block my-5'
})``
