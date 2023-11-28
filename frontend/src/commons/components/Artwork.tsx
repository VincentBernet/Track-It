import styled from "styled-components";
import { image } from "../spotify/responsesTypes";

type ArtworkProps = {
    images: image[];
    isRounded?: boolean;
    size?: string;
};

const Artwork = ({ images, isRounded = false, size = "300px" }: ArtworkProps) => {
    if (images.length === 0 || !images[0].url) {
        return (
            <StyledArtwork src={'/images/default_image.png'} $isRounded={isRounded} $size={size} />
        );
    }

    return (
        <StyledArtwork src={images[0].url} $isRounded={isRounded} $size={size} />
    );
}

type StyledArtworkProps = {
    $isRounded: boolean;
    $size: string;
};

const StyledArtwork = styled.img<StyledArtworkProps>`
    width: ${(props) => props.$size};
    border-radius: ${(props) => props.$isRounded ? "8px" : "0px"};
`;

export default Artwork;