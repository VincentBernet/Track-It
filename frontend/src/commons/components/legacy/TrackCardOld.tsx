import { useNavigate } from "react-router-dom";
import type { Track } from "../../spotify/responsesTypes";
import { formatDuration } from "../../utils";

type TrackCardOldProps = {
	track: Track;
	index: number;
	handleSelectedTracks?: (id: string) => void;
	isSelected?: boolean;
	isClickable?: boolean;
	consultationMode?: boolean;
};

const TrackCardOld = ({
	track,
	index,
	handleSelectedTracks = () => {},
	isClickable = true,
	isSelected = false,
	consultationMode = true,
}: TrackCardOldProps) => {
	const navigate = useNavigate();
	return (
		<button
			type="button"
			/*selected={isSelected}
			isClickable={isClickable}*/
			onClick={() =>
				isClickable && (consultationMode ? navigate(`/track/${track.id}`) : handleSelectedTracks(track.uri))
			}
		>
			<div className="track__item__num">{index + 1}</div>
			<div className="track__item__title-group">
				{track.album.images.length && track.album.images[2] ? (
					<div className="track__item__img">
						<img src={track.album.images[2].url} alt={track.name} />
					</div>
				) : (
					<div className="track__item__img">
						<img src={"/images/default_image.png"} alt={track.name} />
					</div>
				)}
				<div className="track__item__name-artist">
					<div className="track__item__name overflow-ellipsis">{track.name}</div>
					<div className="track__item__artist overflow-ellipsis">
						{track.artists.map((artist, i) => (
							<span key={`$${artist.id} ${i}`}>
								{artist.name}
								{i !== track.artists.length - 1 && ", "}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="track__item__album overflow-ellipsis">{track.album.name}</div>
			<div className="track__item__duration">{formatDuration(track.duration_ms)}</div>
		</button>
	);
};

export default TrackCardOld;
