import { Link } from "react-router-dom";
import type { ProfileData } from "../../spotify/responsesTypes";

type EasyModificationHeaderProps = {
	profile: ProfileData | null;
};

const EasyModificationHeader = ({ profile }: EasyModificationHeaderProps) => {
	if (!profile) {
		return null;
	}

	return (
		<div>
			{profile.images.length && profile.images[0].url && (
				<Link to="/profile">
					<img style={{ width: "50px" }} src={profile.images[0].url} alt="Avatar" />
				</Link>
			)}
			<Link to="/profile">{profile.display_name}</Link>
		</div>
	);
};

export default EasyModificationHeader;
