import Spinner from 'assets/images/spinner.gif'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

interface LazyImageProps {
  src: string
  alt: string
}

const ImageWrapper = styled.div.attrs({
  className: 'relative w-full h-full'
})``
const Placeholder = styled.div.attrs({
  className: 'absolute inset-0'
})`
  background: #eeedeb url(${Spinner}) no-repeat center/22px;
`
const ImageStyled = styled.img.attrs({
  className: 'rounded-full'
})`
  margin: 0 auto;
`

const AppLazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const placeholderRef = React.useRef<HTMLDivElement>(null)

  const removePlaceholder = () => {
    if (placeholderRef.current !== null) {
      placeholderRef.current.remove()
    }
  }

  return (
    <ImageWrapper>
      <Placeholder ref={placeholderRef} />

      <LazyLoad>
        <ImageStyled
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </ImageWrapper>
  )
}

export { AppLazyImage }
