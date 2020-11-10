import Spinner from 'assets/images/spinner.gif'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

// interface LazyImageProps {
//   src: string
//   alt: string
// }

const ImageWrapper = styled.div.attrs({
  className: 'text-center'
})`
  font-size: 0;
`
const Placeholder = styled.div`
  background: #eeedeb url(${Spinner}) no-repeat center/22px;
`

const AppLazyImage: React.FC = ({ children }) => {
  const placeholderRef = React.useRef<HTMLDivElement>(null)

  const removePlaceholder = () => {
    if (placeholderRef.current !== null) {
      placeholderRef.current.remove()
    }
  }

  return (
    <ImageWrapper>
      <LazyLoad placeholder={<Placeholder />}>{children}</LazyLoad>
    </ImageWrapper>
  )
}

export { AppLazyImage }
