import { StyledListReset } from '../styles';
import { tracksDataItem } from '../spotify/responsesTypes';
import TrackCard from './TrackCard';
import { Artwork, ErrorOrLoader } from './index';
import { formatDuration } from '../utils';


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
                <table>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                    {tracks.map(({ track }, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>
                                <Artwork
                                    images={track.album.images}
                                    size={"40px"}
                                    alt={`${track.name} artwork`}
                                />
                                {track.name}
                                {track.artists.map((artist, i) => artist.name + (i !== track.artists.length - 1 && ', '))}
                            </td>
                            <td>{track.album.name}</td>
                            <td>{formatDuration(track.duration_ms)}</td>
                            {/*<TrackCard
                                track={track}
                                key={track.id + i}
                                index={i}
                                clickable
                                consultationMode={consultationMode}
                                isSelected={selectedTracksUris.includes(track.uri)}
                                handleSelectedTracks={handleSelectedTracks}
                            />*/}
                        </tr>
                    ))}
                </table>
                /*<StyledListReset>
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
                </StyledListReset>*/
            ) : (
                <p className="empty-notice">No tracks available</p>
            )}
        </>
    );
}

export default TrackCardList;