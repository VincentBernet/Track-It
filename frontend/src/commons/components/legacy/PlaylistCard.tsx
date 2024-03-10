import type { playlistType as handlePlaylistType } from "../../../features/pages/easy-modification/EasyModificationUtils";
import type { playlistType } from "../../spotify/responsesTypes";
import { StyledAnimatedIcone, StyledPlaylistCard } from "../../styles";
import { EyeSvg } from "../icons";
import { Artwork, TemporaryComponent } from "../index";

interface PlaylistCardProps {
	playlist: playlistType;
	handleOnDelete: () => void;
	clickable?: boolean;
	isSelected?: boolean;
	displayNotification?: boolean;
	handleSelected?: ({ id, name }: handlePlaylistType) => void;
	handleVisiblePlaylist?: ({ id, name }: handlePlaylistType) => void;
}

const PlaylistCard = ({
	playlist,
	handleOnDelete,
	isSelected = false,
	clickable = false,
	displayNotification = false,
	handleSelected = () => {},
	handleVisiblePlaylist = () => {},
}: PlaylistCardProps) => {
	return (
		<StyledPlaylistCard
			$selected={isSelected}
			$clickable={clickable}
			onClick={() => clickable && handleSelected({ id: playlist.id, name: playlist.name })}
		>
			<div>
				<Artwork images={playlist.images} size={"40px"} alt={playlist.name} />
				<span className={"playlistName"}>{playlist.name}</span>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
				{displayNotification && (
					<TemporaryComponent handleOnDelete={handleOnDelete}>
						<StyledAnimatedIcone src={"./images/check.png"} alt={"check"} />
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
		</StyledPlaylistCard>
	);
};

export default PlaylistCard;
