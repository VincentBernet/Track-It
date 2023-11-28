import { StyledListReset } from '../styles';
import { tracksDataItem } from '../spotify/responsesTypes';
import TrackCard from './TrackCard';
import { ErrorOrLoader } from './index';


interface TrackCardListProps {
    tracks: tracksDataItem[] | null;
    errorFetchingTracks?: boolean;
    selectedTracksUris: string[];
    handleSelectedTracks: (id: string) => void;
    consultationMode?: boolean;
}

const TrackCardList = ({ tracks, errorFetchingTracks, selectedTracksUris, handleSelectedTracks, consultationMode }: TrackCardListProps) => {
    if (tracks === null && errorFetchingTracks !== undefined) {
        return (
            <ErrorOrLoader error={errorFetchingTracks} />
        );
    }
    return (
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
}

export default TrackCardList;