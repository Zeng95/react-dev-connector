import { DatePicker, Checkbox } from 'rsuite'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'

export const AppContent = styled.main.attrs({
  className: 'mt-24 mb-12'
})``

export const PageStyled = styled.section.attrs({
  className: 'mx-auto px-8'
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

export const DatePickerStyled = styled(DatePicker)`
  .rs-picker-toggle-caret {
    right: 12px !important;
    color: #575757;
  }
`

export const CheckboxStyled = styled(Checkbox)`
  label {
    line-height: normal;
  }

  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`
