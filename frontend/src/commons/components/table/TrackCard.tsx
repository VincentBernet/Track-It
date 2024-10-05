import { useNavigate } from "react-router-dom";
import { getArtistsName } from "../../../features/pages/easy-modification/EasyModificationUtils";
import type { TrackWithLiked } from "../../spotify/responsesTypes";
import { formatDuration } from "../../utils";
import { EyeSvg, HeartSvg } from "../icons";
import { Artwork, SearchedElement } from "../index";
import type { TableOptions } from "./Utils";

type TrackCardProps = {
	track: TrackWithLiked;
	addedAt: string;
	index: number;
	tableOptions: TableOptions;
	displayMode: "list" | "compact";
	searchFilter: string;
	handleSelectedTracks?: (id: string) => void;
	isSelected?: boolean;
	isClickable?: boolean;
	handleLikedButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, trackId: string) => void;
};

const TrackCard = ({
	track,
	addedAt,
	index,
	tableOptions,
	displayMode,
	searchFilter,
	handleSelectedTracks = () => {},
	handleLikedButton = () => alert("valeur par défaut"),
	isClickable = true,
	isSelected = false,
}: TrackCardProps) => {
	const navigate = useNavigate();
	return (
		<button type="button" /*selected={isSelected}*/ onClick={() => isClickable && handleSelectedTracks(track.uri)}>
			<td className="centered first">{index + 1}</td>

			{displayMode === "list" && (tableOptions.name.isDisplayed || tableOptions.artist.isDisplayed) && (
				<td>
					<div className={"flex"}>
						<Artwork images={track.album.images} size={"40px"} alt={`${track.name} artwork`} />
						<div>
							{tableOptions.name.isDisplayed && (
								<div className="big-primary-text">
									<SearchedElement searchFilter={searchFilter} text={track.name} />
								</div>
							)}
							{tableOptions.artist.isDisplayed && (
								<div className="secondary-text">
									<SearchedElement searchFilter={searchFilter} text={getArtistsName(track.artists)} />
								</div>
							)}
						</div>
					</div>
				</td>
			)}
			{displayMode === "compact" && (
				<>
					{tableOptions.name.isDisplayed && (
						<td>
							<SearchedElement searchFilter={searchFilter} text={track.name} />
						</td>
					)}
					{tableOptions.artist.isDisplayed && (
						<td className="secondary-text">
							<SearchedElement searchFilter={searchFilter} text={getArtistsName(track.artists)} />
						</td>
					)}
				</>
			)}
			{tableOptions.album.isDisplayed && (
				<td className="secondary-text">
					<SearchedElement searchFilter={searchFilter} text={track.album.name} />
				</td>
			)}
			<td>
				<div style={{ display: "flex", gap: "8px" }}>
					<button type="button" className="button-ahead noPadding" onClick={(e) => handleLikedButton(e, track.id)}>
						<HeartSvg isLiked={track.isSaved} />
					</button>
					<button
						type="button"
						className="button-ahead visibleOnHover noPadding"
						onClick={(e) => {
							e.stopPropagation();
							navigate(`/track/${track.id}`);
						}}
					>
						<EyeSvg />
					</button>
				</div>
			</td>
			{tableOptions.date_added.isDisplayed && <td className="secondary-text">{addedAt}</td>}

			{tableOptions.duration.isDisplayed && (
				<td className="secondary-text last">{formatDuration(track.duration_ms)}</td>
			)}
		</button>
	);
};

export default TrackCard;
