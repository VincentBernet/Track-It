import { formatDuration } from '../../utils';
import { track } from '../../spotify/responsesTypes';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '../index';
import styled from 'styled-components';
import { tableOptionsType } from './TrackCardList';


interface TrackCardProps {
    track: track;
    addedAt: string;
    index: number;
    tableOptions: tableOptionsType;
    displayMode: 'list' | 'compact';
    handleSelectedTracks?: (id: string) => void;
    isSelected?: boolean;
    clickable?: boolean;
    consultationMode?: boolean;
}

const TrackCard = ({ track, addedAt, index, tableOptions, displayMode, handleSelectedTracks = () => { }, clickable = true, isSelected = false, consultationMode = true }: TrackCardProps) => {
    const navigate = useNavigate();
    return (
        <StyledTableRow
            $selected={isSelected}
            onClick={() => clickable && (!consultationMode ? handleSelectedTracks(track.uri) : navigate(`/track/${track.id}`))}
        >
            <td className="centered first">{index + 1}</td>

            {(displayMode === 'list' && (tableOptions.name.isDisplayed || tableOptions.artist.isDisplayed)) && (
                <td>
                    <div className={'flex'}>
                        <Artwork
                            images={track.album.images}
                            size={"40px"}
                            alt={`${track.name} artwork`}
                        />
                        <div>
                            {tableOptions.name.isDisplayed && (
                                <div className="big-primary-text">
                                    {track.name}
                                </div>
                            )}
                            {tableOptions.artist.isDisplayed && (
                                <div className="secondary-text">
                                    {track.artists.map((artist, i) => artist.name + (i !== track.artists.length - 1 ? ', ' : ''))}
                                </div>
                            )}
                        </div>
                    </div>
                </td>
            )}
            {(displayMode === 'compact') && (
                <>
                    {tableOptions.name.isDisplayed && (
                        <td>
                            {track.name}
                        </td>
                    )}
                    {tableOptions.artist.isDisplayed && (
                        <td className="secondary-text">
                            {track.artists.map((artist, i) => artist.name + (i !== track.artists.length - 1 ? ', ' : ''))}
                        </td>
                    )}
                </>
            )}
            {tableOptions.album.isDisplayed && (
                <td className="secondary-text">{track.album.name}</td>
            )}
            {tableOptions.date_added.isDisplayed && (
                <td className="secondary-text" >{addedAt}</td>
            )}
            {tableOptions.duration.isDisplayed && (
                <td className="secondary-text last">{formatDuration(track.duration_ms)}</td>
            )}
        </StyledTableRow >
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