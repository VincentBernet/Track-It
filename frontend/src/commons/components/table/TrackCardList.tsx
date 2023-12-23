import styled from 'styled-components';
import { tracksData, tracksDataItem } from '../../spotify/responsesTypes';
import { ErrorOrLoader, SearchFilter, SortDropdown, PropertiesDropdown, TableHeader } from '../index';
import TrackCard from './TrackCard';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUserSavedTracks } from '../../spotify/requests';
import axios from 'axios';
import { formatDateAdded } from '../../utils';


type TrackCardListProps = {
    selectedTracksUris: string[];
    handleSelectedTracks: (id: string) => void;
    consultationMode?: boolean;
}

type columnOption = {
    isAscending: boolean | undefined,
    label: string,
    isDisplayed: boolean,
};

export type tableOptionsType = {
    [key: string]: columnOption,
    date_added: columnOption,
    name: columnOption,
    artist: columnOption,
    album: columnOption,
    duration: columnOption,
};


const TrackCardList = ({ selectedTracksUris, handleSelectedTracks, consultationMode }: TrackCardListProps) => {
    /* Get Tracks : For Fetching tracks */
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<tracksDataItem[] | null>(null);
    const [successFetchingTracks, setSuccessFetchingTracks] = useState<boolean | null>(null);
    const [errorFetchingTracks, setErrorFetchingTracks] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserSavedTracks();
                setTracksData(data);
            }
            catch {
                setErrorFetchingTracks(true);
            }
        };
        fetchData();
    }, []);

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    useEffect(() => {
        if (!tracksData) {
            return;
        }

        // Tracks endpoint only returns 50 playlists at a time, so we need to
        // make sure we get ALL tracks by fetching the next set of tracks
        const fetchMoreData = async () => {
            if (tracksData.next) {
                try {
                    const { data } = await axios.get(tracksData.next);
                    setTracksData(data);
                }
                catch {
                    setErrorFetchingTracks(true);
                }
            }
            else {
                setSuccessFetchingTracks(true);
            }
        };

        // Use functional update to update tracks state variable
        // to avoid including tracks as a dependency for this hook
        // and creating an infinite loop
        setTracks(tracks => ([
            ...tracks ? tracks : [],
            ...(tracksData.items)
        ]));

        // Fetch next set of tracks as needed
        fetchMoreData();

    }, [tracksData]);

    const initialSortByOptionValue: tableOptionsType = {
        date_added: {
            isAscending: true,
            label: 'Date added',
            isDisplayed: true,
        },
        name: {
            isAscending: undefined,
            label: 'Name',
            isDisplayed: true,
        },
        artist: {
            isAscending: undefined,
            label: 'Artist',
            isDisplayed: true,
        },
        album: {
            isAscending: undefined,
            label: 'Album',
            isDisplayed: true,
        },
        duration: {
            isAscending: undefined,
            label: 'Duration',
            isDisplayed: true,
        },
    };

    // TableOptions for sorting tracks and display / hiding columns state
    const [tableOptions, setTableOptions] = useState<tableOptionsType>(initialSortByOptionValue);
    const [displayMode, setDisplayMode] = useState<'list' | 'compact'>('list');

    const handleDisplayMode = (mode: 'list' | 'compact') => {
        setDisplayMode(mode);
    }

    // Filtering state
    const [searchFilter, setSearchFilter] = useState<string>('');

    // Sort tracks by audio feature to be used in template
    const sortedTracks = useMemo(() => {
        if (!tracks) {
            return null;
        }

        if (!successFetchingTracks) {
            return null;
        }

        const sortedTracks = [...tracks];

        if (tableOptions.date_added.isAscending !== undefined) {
            if (tableOptions.date_added.isAscending === true) {
                return sortedTracks.sort((a, b) => b.added_at.localeCompare(a.added_at));
            }
            else {
                return sortedTracks.sort((a, b) => a.added_at.localeCompare(b.added_at));
            }
        }


        if (tableOptions.name.isAscending !== undefined) {
            if (tableOptions.name.isAscending === true) {
                return sortedTracks.sort((a, b) => a.track.name.localeCompare(b.track.name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.name.localeCompare(a.track.name));
            }
        }

        if (tableOptions.artist.isAscending !== undefined) {
            if (tableOptions.artist.isAscending === true) {
                return sortedTracks.sort((a, b) => a.track.artists[0].name.localeCompare(b.track.artists[0].name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.artists[0].name.localeCompare(a.track.artists[0].name));
            }
        }

        if (tableOptions.album.isAscending !== undefined) {
            if (tableOptions.album.isAscending === true) {
                return sortedTracks.sort((a, b) => a.track.album.name.localeCompare(b.track.album.name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.album.name.localeCompare(a.track.album.name));
            }
        }

        if (tableOptions.duration.isAscending !== undefined) {
            if (tableOptions.duration.isAscending === true) {
                return sortedTracks.sort((a, b) => a.track.duration_ms - b.track.duration_ms);
            }
            else {
                return sortedTracks.sort((a, b) => b.track.duration_ms - a.track.duration_ms);
            }
        }

        return sortedTracks;
    }, [tableOptions, successFetchingTracks, tracks]);

    const filteredAndSortedTracks = useMemo(() => {
        if (!sortedTracks) {
            return null;
        }

        if (searchFilter === '') {
            return sortedTracks;
        }

        return sortedTracks.filter((track) => (
            track.track.name.toLowerCase().includes(searchFilter.toLowerCase())
            || track.track.album.name.toLowerCase().includes(searchFilter.toLowerCase())
            || track.track.artists[0].name.toLowerCase().includes(searchFilter.toLowerCase())
        ));
    }, [searchFilter, sortedTracks]);


    if (filteredAndSortedTracks === null || errorFetchingTracks === true) {
        return (
            <ErrorOrLoader error={errorFetchingTracks} />
        );
    }

    const handleSort = (selectedColumnName: string) => {
        const newTableOption: tableOptionsType = {
            date_added: {
                isAscending: undefined,
                label: 'Date added',
                isDisplayed: tableOptions.date_added.isDisplayed,
            },
            name: {
                isAscending: undefined,
                label: 'Name',
                isDisplayed: tableOptions.name.isDisplayed,
            },
            artist: {
                isAscending: undefined,
                label: 'Artist',
                isDisplayed: tableOptions.artist.isDisplayed,
            },
            album: {
                isAscending: undefined,
                label: 'Album',
                isDisplayed: tableOptions.album.isDisplayed,
            },
            duration: {
                isAscending: undefined,
                label: 'Duration',
                isDisplayed: tableOptions.duration.isDisplayed,
            },
        };
        if (tableOptions[selectedColumnName].isAscending === undefined) {
            newTableOption[selectedColumnName].isAscending = true;
            setTableOptions(newTableOption);
            return;
        }
        else {
            newTableOption[selectedColumnName].isAscending = !tableOptions[selectedColumnName].isAscending;
            setTableOptions(newTableOption);
            return;
        }
    }

    const handleDisplay = (selectedColumnName: string) => {
        const temporaryTableOptions: tableOptionsType = {
            date_added: {
                isAscending: tableOptions.date_added.isAscending,
                label: 'Date added',
                isDisplayed: tableOptions.date_added.isDisplayed,
            },
            name: {
                isAscending: tableOptions.name.isAscending,
                label: 'Name',
                isDisplayed: tableOptions.name.isDisplayed,
            },
            artist: {
                isAscending: tableOptions.artist.isAscending,
                label: 'Artist',
                isDisplayed: tableOptions.artist.isDisplayed,
            },
            album: {
                isAscending: tableOptions.album.isAscending,
                label: 'Album',
                isDisplayed: tableOptions.album.isDisplayed,
            },
            duration: {
                isAscending: tableOptions.duration.isAscending,
                label: 'Duration',
                isDisplayed: tableOptions.duration.isDisplayed,
            },
        };
        temporaryTableOptions[selectedColumnName].isDisplayed = !tableOptions[selectedColumnName].isDisplayed;
        setTableOptions(temporaryTableOptions)
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', gap: "10px", alignItems: "center" }}>
                <SortDropdown
                    tableOptions={tableOptions}
                    handleSort={handleSort}
                />
                <SearchFilter
                    onChange={(inputValue) => setSearchFilter(inputValue)}
                />
                <PropertiesDropdown
                    tableOptions={tableOptions}
                    displayMode={displayMode}
                    handleDisplayMode={handleDisplayMode}
                    handleDisplay={handleDisplay}
                />
            </div>
            {filteredAndSortedTracks && filteredAndSortedTracks.length ? (
                <StyledTable>
                    <TableHeader
                        tableOptions={tableOptions}
                        displayMode={displayMode}
                        handleSort={handleSort}
                    />
                    <tbody>
                        {filteredAndSortedTracks.map(({ track, added_at }, i) => (
                            <TrackCard
                                tableOptions={tableOptions}
                                displayMode={displayMode}
                                track={track}
                                addedAt={formatDateAdded(added_at)}
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
        border-bottom: 1px solid var(--dark-grey);
        &:hover {
            background-color: var(--dark-grey);
        }
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        .center {
            text-align: center;
        }
    }

    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 10px;
`;