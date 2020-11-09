import React from 'react'
import styled, { keyframes } from 'styled-components'
import LazyLoad from 'react-lazyload'

interface LazyImageProps {
  src: string
  alt: string
}

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }

  50% {
    background-color: #ccc;
  }

  100% {
    background-color: #fff;
  }
`

const ImageWrapper = styled.div.attrs({
  className: 'relative w-full h-full'
})``

const Placeholder = styled.div.attrs({
  className: 'absolute inset-0'
})`
  animation: ${loadingAnimation} 1s infinite;
`

const ImageStyled = styled.img.attrs({
  className: 'absolute w-full h-full rounded-full'
})``

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
