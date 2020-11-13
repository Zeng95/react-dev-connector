import Spinner from 'assets/images/spinner.gif'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface LazyImageProps {
  linkPath: {
    pathname: string
    state: { userId: string }
  }
  src: string
  alt: string
  width?: string
  height?: string
}

interface ImageWrapperProps {
  width?: string
  height?: string
}

const ImageWrapper = styled.div.attrs({
  className: 'relative w-full h-full text-center'
})<ImageWrapperProps>`
  font-size: 0;
  width: ${props => props.width};
  height: ${props => props.height};
`
const Placeholder = styled.div.attrs({
  className: 'absolute inset-0'
})`
  background: #eeedeb url(${Spinner}) no-repeat center/22px;
`
const ImageLink = styled(Link).attrs({
  className: 'inline-block'
})``
const ImageStyled = styled.img.attrs({
  className: 'rounded-full'
})``

const AppLazyImage: React.FC<LazyImageProps> = props => {
  const { linkPath, src, alt, width, height } = props
  const placeholderRef = React.useRef<HTMLDivElement>(null)

  const removePlaceholder = () => {
    if (placeholderRef.current !== null) {
      placeholderRef.current.remove()
    }
  }

  return (
    <ImageWrapper width={width} height={height}>
      <Placeholder ref={placeholderRef} />
      <LazyLoad>
        <ImageLink to={linkPath}>
          <ImageStyled
            src={src}
            alt={alt}
            onLoad={removePlaceholder}
            onError={removePlaceholder}
          />
        </ImageLink>
      </LazyLoad>
    </ImageWrapper>
  )
}

export { AppLazyImage }
