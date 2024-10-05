import type { Image } from "../../spotify/responsesTypes";

type ArtworkProps = {
	images: Image[];
	alt: string;
	isRounded?: boolean;
	size?: string;
};

// TODO : Add a url parameter to redirect to the spotify page (for artist, tracks and playlist) test
const Artwork = ({ images, alt, isRounded = false, size = "300px" }: ArtworkProps) => {
	if (images === null) {
		return <img src={"/images/default_image.png"} /*isRounded={isRounded}*/ size={size} alt={alt} />;
	}
	return <img src={images[0].url} /*isRounded={isRounded}*/ size={size} alt={alt} />;
};

export default Artwork;
