import { formatDuration } from '../../utils';
import { trackWithLiked } from '../../spotify/responsesTypes';
import { useNavigate } from 'react-router-dom';
import { Artwork, SearchedElement } from '../index';
import styled from 'styled-components';
import { tableOptionsType } from './TrackCardList';
import { getArtistsName } from '../../../features/pages/easy-modification/EasyModificationUtils';
import { HeartSvg } from '../icons';


interface TrackCardProps {
    track: trackWithLiked;
    addedAt: string;
    index: number;
    tableOptions: tableOptionsType;
    displayMode: 'list' | 'compact';
    searchFilter: string;
    handleSelectedTracks?: (id: string) => void;
    isSelected?: boolean;
    clickable?: boolean;
    consultationMode?: boolean;
    handleLikedButton?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, trackId: string) => void;
}

const TrackCard = ({ track, addedAt, index, tableOptions, displayMode, searchFilter,
    handleSelectedTracks = () => { }, handleLikedButton = () => alert("valeur par défaut"), clickable = true, isSelected = false, consultationMode = true }: TrackCardProps) => {
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
                                    <SearchedElement searchFilter={searchFilter} text={track.name} />
                                </div>
                            )}
                            {tableOptions.artist.isDisplayed && (
                                <div className="secondary-text">
                                    <SearchedElement searchFilter={searchFilter} text={getArtistsName(track.artists)} />
                                </div>
                            )}
                        </div>
                    </div>
                </td>
            )
            }
            {
                (displayMode === 'compact') && (
                    <>
                        {tableOptions.name.isDisplayed && (
                            <td>
                                <SearchedElement searchFilter={searchFilter} text={track.name} />
                            </td>
                        )}
                        {tableOptions.artist.isDisplayed && (
                            <td className="secondary-text">
                                <SearchedElement searchFilter={searchFilter} text={getArtistsName(track.artists)} />
                            </td>
                        )}
                    </>
                )
            }
            {
                tableOptions.album.isDisplayed && (
                    <td className="secondary-text">
                        <SearchedElement searchFilter={searchFilter} text={track.album.name} />
                    </td>
                )
            }
            {
                tableOptions.date_added.isDisplayed && (
                    <td className="secondary-text">
                        {addedAt}
                        <button className="button-ahead" onClick={(e) => handleLikedButton(e, track.id)}>
                            <HeartSvg isLiked={track.isSaved} />
                        </button>
                    </td>
                )
            }

            {
                tableOptions.duration.isDisplayed && (
                    <td className="secondary-text last">{formatDuration(track.duration_ms)}</td>
                )
            }
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

        .button-ahead {
            z-index: 1;
            background-color: transparent;
        }
    }

    .flex {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .searched {
        color: var(--green);
        font-weight: bold;
    }
`;