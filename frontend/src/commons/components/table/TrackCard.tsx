import { formatDuration } from '../../utils';
import { track } from '../../spotify/responsesTypes';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../index';
import styled from 'styled-components';


interface TrackCardProps {
    track: track;
    addedAt: string;
    index: number;
    handleSelectedTracks?: (id: string) => void;
    isSelected?: boolean;
    clickable?: boolean;
    consultationMode?: boolean;
}

const TrackCard = ({ track, addedAt, index, handleSelectedTracks = () => { }, clickable = true, isSelected = false, consultationMode = true }: TrackCardProps) => {
    const navigate = useNavigate();
    return (
        <StyledTableRow
            $selected={isSelected}
            onClick={() => clickable && (!consultationMode ? handleSelectedTracks(track.uri) : navigate(`/track/${track.id}`))}
        >
            <td className="centered first">{index + 1}</td>
            <td>
                <div className={'flex'}>
                    <Artwork
                        images={track.album.images}
                        size={"40px"}
                        alt={`${track.name} artwork`}
                    />
                    <div>
                        <div>
                            {track.name}
                        </div>
                        <div>
                            {track.artists.map((artist, i) => artist.name + (i !== track.artists.length - 1 ? ', ' : ''))}
                        </div>
                    </div>
                </div>
            </td>
            <td>{track.album.name}</td>
            <td>{addedAt}</td>
            <td className="last">{formatDuration(track.duration_ms)}</td>
        </StyledTableRow>
    );
}

export default TrackCard;

type StyledTableRowProps = {
    $selected: boolean;
}

const StyledTableRow = styled.tr<StyledTableRowProps>`
    cursor: pointer;
    &:hover {
        background-color: #282828;
    }

    td {
        padding: 5px;
        border-top: ${props => props.$selected ? `1px solid var(--green)` : '1px solid transparent'};
        border-bottom: ${props => props.$selected ? `1px solid var(--green)` : '1px solid transparent'};

        &.first {
            border-left: ${props => props.$selected ? `1px solid var(--green)` : '1px solid transparent'};
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
        }

        &.last {
            border-right: ${props => props.$selected ? `1px solid var(--green)` : '1px solid transparent'};
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }

        &.centered {
            text-align: center;
        }
    }

    .flex {
        display: flex;
        align-items: center;
        gap: 15px;
    }
`;