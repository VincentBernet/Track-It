import styled from 'styled-components';
import { tracksDataItem } from '../spotify/responsesTypes';
import { ErrorOrLoader } from './index';
import TrackCard from './TrackCard';


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
                <StyledTable>
                    <thead>
                        <tr>
                            <th title='Sort by custom spotify index'>Index</th>
                            <th title='Sort by music title'>Name</th>
                            <th title='Sort by album'>Album</th>
                            <th title='Sort by duration'>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </StyledTable>
            ) : (
                <p className="empty-notice">No tracks available</p>
            )}
        </>
    );
}

export default TrackCardList;

const StyledTable = styled.table`
    th {
        cursor: pointer;
        text-align: left;
        padding: 0.5rem;
        border-bottom: 1px solid #282828;
        &:hover {
            background-color: #282828;
        }
    }

    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 10px;
`;