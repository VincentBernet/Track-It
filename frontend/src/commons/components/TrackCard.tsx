import { formatDuration } from '../utils';
import { track } from '../spotify/responsesTypes';
import { StyledTrackCard } from '../styles';

interface TrackCardProps {
    track: track;
    index: number;
    handleSelectedTracks?: (id: string) => void;
    isSelected?: boolean;
    clickable?: boolean;
}

const TrackCard = ({ track, index, handleSelectedTracks, clickable = false, isSelected = false }: TrackCardProps) => {
    return (
        <StyledTrackCard
            selected={isSelected}
            clickable={clickable ? "clickable" : ""}
            onClick={() => ((clickable && handleSelectedTracks) && handleSelectedTracks(track.uri))}
        >
            <div className="track__item__num">{index + 1}</div>
            <div className="track__item__title-group">
                {track.album.images.length && track.album.images[2] ? (
                    <div className="track__item__img">
                        <img src={track.album.images[2].url} alt={track.name} />
                    </div>
                ) : (
                    <div className="track__item__img">
                        <img src={'/images/default_image.png'} alt={track.name} />
                    </div>
                )}
                <div className="track__item__name-artist">
                    <div className="track__item__name overflow-ellipsis">
                        {track.name}
                    </div>
                    <div className="track__item__artist overflow-ellipsis">
                        {track.artists.map((artist, i) => (
                            <span key={i}>
                                {artist.name}{i !== track.artists.length - 1 && ', '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="track__item__album overflow-ellipsis">
                {track.album.name}
            </div>
            <div className="track__item__duration">
                {formatDuration(track.duration_ms)}
            </div>
        </StyledTrackCard >
    );
}

export default TrackCard;