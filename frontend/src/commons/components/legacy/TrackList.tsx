import type { Track } from "../../spotify/responsesTypes";
import TrackCardOld from "./TrackCardOld";

type TrackListProps = {
	tracks: Track[];
	isClickable?: boolean;
};

const TrackList = ({ tracks, isClickable }: TrackListProps) => (
	<>
		{tracks?.length ? (
			<li>
				{tracks.map((track, i) => (
					<TrackCardOld key={`${track.name} ${track.id} ${i}`} track={track} index={i} isClickable={isClickable} />
				))}
			</li>
		) : (
			<p className="empty-notice">No tracks available</p>
		)}
	</>
);

export default TrackList;
