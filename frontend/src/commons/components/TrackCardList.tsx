import styled from 'styled-components';
import { tracksData, tracksDataItem } from '../spotify/responsesTypes';
import { ErrorOrLoader, SearchFilter } from './index';
import TrackCard from './TrackCard';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUserSavedTracks } from '../spotify/requests';
import axios from 'axios';
import { SortArrowSvg } from './Icon';


interface TrackCardListProps {
    selectedTracksUris: string[];
    handleSelectedTracks: (id: string) => void;
    consultationMode?: boolean;
}

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

    type sortValue = 'spotify' | 'name' | 'album' | 'duration';

    // Sorting state
    const [sortValue, setSortValue] = useState<sortValue>('spotify');
    const [sortDescOrder, setSortDescOrder] = useState<boolean>(true);

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

        if (sortValue === 'spotify') {
            if (sortDescOrder) {
                return tracks;
            }
            else {
                return [...tracks].reverse();
            }
        }

        const sortedTracks = [...tracks];

        sortedTracks.sort((a, b) => {
            switch (sortValue) {
                case 'name':
                    if (sortDescOrder) {
                        return a.track.name.localeCompare(b.track.name);
                    }
                    else {
                        return b.track.name.localeCompare(a.track.name);
                    }
                case 'album':
                    if (sortDescOrder) {
                        return a.track.album.name.localeCompare(b.track.album.name);
                    }
                    else {
                        return b.track.album.name.localeCompare(a.track.album.name);
                    }
                case 'duration':
                    if (sortDescOrder) {
                        return a.track.duration_ms - b.track.duration_ms;
                    }
                    else {
                        return b.track.duration_ms - a.track.duration_ms;
                    }
            }
        });

        return sortedTracks;
    }, [sortDescOrder, sortValue, successFetchingTracks, tracks]);

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


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <SearchFilter
                    onChange={(inputValue) => setSearchFilter(inputValue)}
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button disabled>Add filter</button>
                    <button disabled>Modify Columns</button>
                </div>
            </div>
            {filteredTracks && filteredTracks.length ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th onClick={() => { setSortValue('spotify'); setSortDescOrder(!sortDescOrder) }} title='Sort by custom spotify index'>
                                <div className='flex'>
                                    Index
                                    <SortArrowSvg
                                        orientation={sortDescOrder ? 'descending' : 'ascending'}
                                        strokeColor={sortValue === 'spotify' ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => { setSortValue('name'); setSortDescOrder(!sortDescOrder) }} title='Sort by music title'>
                                <div className='flex'>
                                    Name
                                    <SortArrowSvg
                                        orientation={sortDescOrder ? 'descending' : 'ascending'}
                                        strokeColor={sortValue === 'name' ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => { setSortValue('album'); setSortDescOrder(!sortDescOrder) }} title='Sort by album'>
                                <div className='flex'>
                                    Album
                                    <SortArrowSvg
                                        orientation={sortDescOrder ? 'descending' : 'ascending'}
                                        strokeColor={sortValue === 'album' ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                            <th onClick={() => { setSortValue('duration'); setSortDescOrder(!sortDescOrder) }} title='Sort by duration'>
                                <div className='flex'>
                                    Duration
                                    <SortArrowSvg
                                        orientation={sortDescOrder ? 'descending' : 'ascending'}
                                        strokeColor={sortValue === 'duration' ? 'white' : 'none'}
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTracks.map(({ track }, i) => (
                            <TrackCard
                                track={track}
                                key={track.id + i}
                                index={(sortValue === 'spotify' && !sortDescOrder) ? filteredTracks.length - 1 - i : i}
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
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
    }

    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 10px;
`;