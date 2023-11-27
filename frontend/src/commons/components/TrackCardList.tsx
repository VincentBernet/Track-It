import { StyledListReset } from '../styles';
import { tracksDataItem } from '../spotify/responsesTypes';
import TrackCard from './TrackCard';


interface TrackCardListProps {
    tracks: tracksDataItem[];
    selectedTracksUris: string[];
    handleSelectedTracks: (id: string) => void;
    consultationMode?: boolean;

}

const TrackCardList = ({ tracks, selectedTracksUris, handleSelectedTracks, consultationMode }: TrackCardListProps) => (
    <>
        {tracks && tracks.length ? (
            <StyledListReset>
                {tracks.map(({ track }, i) => (
                    <TrackCard
                        track={track}
                        key={track.id + i}
                        index={i}
                        clickable
                        consultationMode={consultationMode}
                        isSelected={selectedTracksUris.includes(track.uri)}
                        handleSelectedTracks={handleSelectedTracks}
                    />
                ))}
            </StyledListReset>
        ) : (
            <p className="empty-notice">No tracks available</p>
        )}
    </>
);

export default TrackCardList;