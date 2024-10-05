import type { Playlist as handlePlaylistType } from "../../../features/pages/easy-modification/EasyModificationUtils";
import type { Playlist } from "../../spotify/responsesTypes";
import { EyeSvg } from "../icons";
import { Artwork, TemporaryComponent } from "../index";

type PlaylistCardProps = {
	playlist: Playlist;
	handleOnDelete: () => void;
	isClickable?: boolean;
	isSelected?: boolean;
	displayNotification?: boolean;
	handleSelected?: ({ id, name }: handlePlaylistType) => void;
	handleVisiblePlaylist?: ({ id, name }: handlePlaylistType) => void;
};

const PlaylistCard = ({
	playlist,
	handleOnDelete,
	isSelected = false,
	isClickable = false,
	displayNotification = false,
	handleSelected = () => {},
	handleVisiblePlaylist = () => {},
}: PlaylistCardProps) => {
	return (
		<button
			type="button"
			/*selected={isSelected}
			isClickable={isClickable}*/
			onClick={() => isClickable && handleSelected({ id: playlist.id, name: playlist.name })}
		>
			<div>
				<Artwork images={playlist.images} size={"40px"} alt={playlist.name} />
				<span className={"playlistName"}>{playlist.name}</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
				{displayNotification && (
					<TemporaryComponent handleOnDelete={handleOnDelete}>
						<img src={"./images/check.png"} alt={"check"} />
					</TemporaryComponent>
				)}
				<button
					type="button"
					className="button-ahead visibleOnHover noPadding"
					onClick={(e) => {
						e.stopPropagation();
						handleVisiblePlaylist({ id: playlist.id, name: playlist.name });
					}}
				>
					<EyeSvg />
				</button>
			</div>
		</button>
	);
};

export default PlaylistCard;
