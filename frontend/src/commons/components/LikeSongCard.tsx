import type { Playlist } from "../../features/pages/easy-modification/EasyModificationUtils";
import { EyeSvg } from "./icons";
import { Artwork } from "./index";

type LikeSongCardProps = {
	handleVisiblePlaylist: ({ id, name }: Playlist) => void;
};

const LikeSongCard = ({ handleVisiblePlaylist }: LikeSongCardProps) => {
	return (
		<button
			type="button"
			/*selected={false}
			isClickable={true}*/
			onClick={() => handleVisiblePlaylist({ id: "0", name: "likedTrack" })}
		>
			<div>
				<Artwork
					images={[
						{
							url: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
							height: 640,
							width: 640,
						},
					]}
					size={"40px"}
					alt={"Liked music"}
				/>
				<span className={"playlistName"}>Liked Songs</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
				<button type="button" className="button-ahead visibleOnHover noPadding">
					<EyeSvg />
				</button>
			</div>
		</button>
	);
};

export default LikeSongCard;
