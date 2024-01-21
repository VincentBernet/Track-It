import { StyledListReset } from '../../styles';
import { trackType } from '../../spotify/responsesTypes';
import TrackCardOld from './TrackCardOld';


interface TrackListProps {
    tracks: trackType[];
    clickable?: boolean;
}

const TrackList = ({ tracks, clickable }: TrackListProps) => (
    <>
        {tracks && tracks.length ? (
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