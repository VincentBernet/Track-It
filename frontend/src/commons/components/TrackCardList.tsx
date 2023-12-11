import styled from 'styled-components';
import { tracksData, tracksDataItem } from '../spotify/responsesTypes';
import { ErrorOrLoader } from './index';
import TrackCard from './TrackCard';
import { useEffect, useMemo, useState } from 'react';
import { getCurrentUserSavedTracks } from '../spotify/requests';
import axios from 'axios';


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


    const [sortValue, setSortValue] = useState<'name' | 'album' | 'duration'>('name');


    // Sort tracks by audio feature to be used in template
    const sortedTracks = useMemo(() => {
        if (!tracks) {
            return null;
        }

        if (!successFetchingTracks) {
            return null;
        }

        const sortedTracks = [...tracks];
        sortedTracks.sort((a, b) => {
            switch (sortValue) {
                case 'name':
                    return a.track.name.localeCompare(b.track.name);
                case 'album':
                    return a.track.album.name.localeCompare(b.track.album.name);
                case 'duration':
                    return b.track.duration_ms - a.track.duration_ms;
            }
        });
        return sortedTracks;
    }, [sortValue, successFetchingTracks, tracks]);


    if (sortedTracks === null || errorFetchingTracks === true) {
        return (
            <ErrorOrLoader error={errorFetchingTracks} />
        );
    }

    return (
        <>
            {sortedTracks && sortedTracks.length ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th onClick={() => { }} title='Sort by custom spotify index'>Index</th>
                            <th onClick={() => { setSortValue('name') }} title='Sort by music title'>Name</th>
                            <th onClick={() => { setSortValue('album') }} title='Sort by album'>Album</th>
                            <th onClick={() => { setSortValue('duration') }} title='Sort by duration'>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTracks.map(({ track }, i) => (
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
                </StyledTable >
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