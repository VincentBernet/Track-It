import styled from 'styled-components'
import type { imageType } from '../../spotify/responsesTypes'
import { ErrorBoundary, ErrorBoundaryContext } from 'react-error-boundary'

type ArtworkProps = {
  images: imageType[]
  alt: string
  isRounded?: boolean
  size?: string
}

// TODO : Add a url parameter to redirect to the spotify page (for artist, tracks and playlist) test
const Artwork = ({
  images,
  alt,
  isRounded = false,
  size = '300px',
}: ArtworkProps) => {
  if (images === null) {
    return (
      <StyledArtwork
        src={'/images/default_image.png'}
        $isRounded={isRounded}
        $size={size}
        alt={alt}
      />
    )
  }
  return (
    <StyledArtwork
      src={images[0].url}
      $isRounded={isRounded}
      $size={size}
      alt={alt}
    />
  )
}

type StyledArtworkProps = {
  $isRounded: boolean
  $size: string
}

const StyledArtwork = styled.img<StyledArtworkProps>`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border-radius: ${(props) => (props.$isRounded ? '8px' : '0px')};
`

export default Artwork
