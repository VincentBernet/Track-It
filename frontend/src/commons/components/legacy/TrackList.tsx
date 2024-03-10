import type { trackType } from "../../spotify/responsesTypes";
import { StyledListReset } from "../../styles";
import TrackCardOld from "./TrackCardOld";

interface TrackListProps {
	tracks: trackType[];
	clickable?: boolean;
}

const TrackList = ({ tracks, clickable }: TrackListProps) => (
	<>
		{tracks?.length ? (
			<StyledListReset>
				{tracks.map((track, i) => (
					<TrackCardOld key={track.id + i} track={track} index={i} clickable={clickable} />
				))}
			</StyledListReset>
		) : (
			<p className="empty-notice">No tracks available</p>
		)}
	</>
);

export default TrackList;
