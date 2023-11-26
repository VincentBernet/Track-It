import { StyledListReset } from '../styles';
import { track } from '../spotify/responsesTypes';
import TrackCard from './TrackCard';

interface TrackListProps {
    tracks: track[];
    clickable?: boolean;
}

const TrackList = ({ tracks, clickable }: TrackListProps) => (
    <>
        {tracks && tracks.length ? (
            <StyledListReset>
                {tracks.map((track, i) => (
                    <TrackCard key={track.id + i} track={track} index={i} clickable={clickable} />
                ))}
            </StyledListReset>
        ) : (
            <p className="empty-notice">No tracks available</p>
        )}
    </>
);

export default TrackList;