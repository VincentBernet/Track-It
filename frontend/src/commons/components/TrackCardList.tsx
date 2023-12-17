import styled from 'styled-components';
import { tracksData, tracksDataItem } from '../spotify/responsesTypes';
import { ErrorOrLoader, SearchFilter, SortDropdown } from './index';
import TrackCard from './TrackCard';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUserSavedTracks } from '../spotify/requests';
import axios from 'axios';
import { SortArrowSvg } from './Icon';


type TrackCardListProps = {
    selectedTracksUris: string[];
    handleSelectedTracks: (id: string) => void;
    consultationMode?: boolean;
}

export type sortOptionType = {
    date_added: boolean | undefined,
    name: boolean | undefined,
    artist: boolean | undefined,
    album: boolean | undefined,
    duration: boolean | undefined
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

    /*type columnsNameType = 'date_added' | 'name' | 'artist' | 'album' | 'duration';*/

    const initialSortByOptionValue: sortOptionType = {
        date_added: true,
        name: undefined,
        artist: undefined,
        album: undefined,
        duration: undefined
    };

    // Sorting state
    const [sortByOption, setSortByOption] = useState<sortOptionType>(initialSortByOptionValue);

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

        if (sortByOption.date_added !== undefined) {
            if (sortByOption.date_added === true) {
                return tracks;
            }
            else {
                return tracks.reverse();
            }
        }

        if (sortByOption.name !== undefined) {
            if (sortByOption.name === true) {
                return sortedTracks.sort((a, b) => a.track.name.localeCompare(b.track.name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.name.localeCompare(a.track.name));
            }
        }

        if (sortByOption.artist !== undefined) {
            if (sortByOption.artist === true) {
                return sortedTracks.sort((a, b) => a.track.artists[0].name.localeCompare(b.track.artists[0].name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.artists[0].name.localeCompare(a.track.artists[0].name));
            }
        }

        if (sortByOption.album !== undefined) {
            if (sortByOption.album === true) {
                return sortedTracks.sort((a, b) => a.track.album.name.localeCompare(b.track.album.name));
            }
            else {
                return sortedTracks.sort((a, b) => b.track.album.name.localeCompare(a.track.album.name));
            }
        }

        if (sortByOption.duration !== undefined) {
            if (sortByOption.duration === true) {
                return sortedTracks.sort((a, b) => a.track.duration_ms - b.track.duration_ms);
            }
            else {
                return sortedTracks.sort((a, b) => b.track.duration_ms - a.track.duration_ms);
            }
        }

        return sortedTracks;
    }, [sortByOption, successFetchingTracks, tracks]);

    const filteredTracks = useMemo(() => {
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


    if (filteredTracks === null || errorFetchingTracks === true) {
        return (
            <ErrorOrLoader error={errorFetchingTracks} />
        );
    }

    const handleSort = (columnsName: string) => {
        const newSortValue: sortOptionType = {
            date_added: undefined,
            name: undefined,
            artist: undefined,
            album: undefined,
            duration: undefined
        };
        if (columnsName === 'date_added') {
            if (sortByOption.date_added === undefined) {
                newSortValue.date_added = true;
                setSortByOption(newSortValue);
                return;
            }
            else {
                newSortValue.date_added = !sortByOption.date_added;
                setSortByOption(newSortValue);
                return;
            }
        }
        if (columnsName === 'name') {
            if (sortByOption.name === undefined) {
                newSortValue.name = true;
                setSortByOption(newSortValue);
                return;
            }
            else {
                newSortValue.name = !sortByOption.name;
                setSortByOption(newSortValue);
                return;
            }
        }
        if (columnsName === 'artist') {
            if (sortByOption.artist === undefined) {
                newSortValue.artist = true;
                setSortByOption(newSortValue);
                return;
            }
            else {
                newSortValue.name = !sortByOption.name;
                setSortByOption(newSortValue);
                return;
            }
        }
        if (columnsName === 'album') {
            if (sortByOption.album === undefined) {
                newSortValue.album = true;
                setSortByOption(newSortValue);
                return;
            }
            else {
                newSortValue.album = !sortByOption.album;
                setSortByOption(newSortValue);
                return;
            }
        }
        if (columnsName === 'duration') {
            if (sortByOption.duration === undefined) {
                newSortValue.duration = true;
                setSortByOption(newSortValue);
                return;
            }
            else {
                newSortValue.duration = !sortByOption.duration;
                setSortByOption(newSortValue);
                return;
            }
        }
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', gap: "15px", alignItems: "center" }}>
                <SortDropdown
                    sortByOption={sortByOption}
                    handleSort={handleSort}
                />
                <SearchFilter
                    onChange={(inputValue) => setSearchFilter(inputValue)}
                />
            </div>
            {filteredTracks && filteredTracks.length ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th title='Index'>
                                <div className='center'>
                                    #
                                </div>
                            </th>
                            <th onClick={() => handleSort('name')} title='Sort by music title'>
                                <div className='flex'>
                                    Track
                                    <SortArrowSvg
                                        orientation={sortByOption.name ? 'descending' : 'ascending'}
                                        strokeColor={sortByOption.name !== undefined ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => handleSort('album')} title='Sort by album'>
                                <div className='flex'>
                                    Album
                                    <SortArrowSvg
                                        orientation={sortByOption.album ? 'descending' : 'ascending'}
                                        strokeColor={sortByOption.album !== undefined ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => handleSort('date_added')} title='Sort by duration'>
                                <div className='flex'>
                                    Date added
                                    <SortArrowSvg
                                        orientation={sortByOption.date_added ? 'descending' : 'ascending'}
                                        strokeColor={sortByOption.date_added !== undefined ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => handleSort('duration')} title='Sort by duration'>
                                <div className='flex'>
                                    Dur.
                                    <SortArrowSvg
                                        orientation={sortByOption.duration ? 'descending' : 'ascending'}
                                        strokeColor={sortByOption.duration !== undefined ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTracks.map(({ track, added_at }, i) => (
                            <TrackCard
                                track={track}
                                addedAt={added_at}
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