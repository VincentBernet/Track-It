import styled from 'styled-components';
import { ErrorOrLoader, PlaylistList, TrackCardList } from '../../../commons/components';
import { StyledNewGrid } from '../../../commons/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists, getCurrentUserSavedTracks, postAddTracksToPlaylist } from '../../../commons/spotify/requests';
import { playlist, playlistsData, tracksData, tracksDataItem } from '../../../commons/spotify/responsesTypes';
import { catchErrors } from '../../../commons/utils';

export const StyledButton = styled.button`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  margin: 100px 50px 0 50px;

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;


const EasyModification = () => {
    /* Error fetching state */
    const [errorFetchingPlaylists, setErrorFetchingPlaylists] = useState<boolean>(false);
    const [errorFetchingTracks, setErrorFetchingTracks] = useState<boolean>(false);


    /* For Fetching playlists */
    const [playlistsData, setPlaylistsData] = useState<playlistsData | null>(null);
    const [playlists, setPlaylists] = useState<playlist[] | null>(null);


    /* For Fetching tracks */
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<tracksDataItem[] | null>(null);


    /* For sending list IDs of selected playlists */
    const [selectedPlaylistsId, setSelectedPlaylistsId] = useState<string[]>([]);

    const handleSelectedPlaylist = (id: string) => {
        if (selectedPlaylistsId.includes(id)) {
            setSelectedPlaylistsId(selectedPlaylistsId.filter((playlistId) => playlistId !== id));
        } else {
            setSelectedPlaylistsId([...selectedPlaylistsId, id]);
        }
    }

    /* For sending list Uri of selected playlists */
    const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

    const handleSelectedTracks = (uri: string) => {
        if (selectedTracksUris.includes(uri)) {
            setSelectedTracksUris(selectedTracksUris.filter((trackUri) => trackUri !== uri));
        } else {
            setSelectedTracksUris([...selectedTracksUris, uri]);
        }
    }

    const handleAddTracksToPlaylists = async () => {
        setSelectedPlaylistsId([]);
        setSelectedTracksUris([]);
        for (const playlistId of selectedPlaylistsId) {
            try {
                const { data } = await postAddTracksToPlaylist(playlistId, selectedTracksUris);
                console.log("adding tracks to playlist, here the response : " + JSON.stringify(data));
            }
            catch {
                console.log("error adding tracks to playlist");
            }
        }
    }

    useEffect(() => {
        // TODO : Delete this abberation, find another solution to change body styling in react
        document.body.style.backgroundColor = "black";
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserPlaylists();
                setPlaylistsData(data);
            }
            catch (e) {
                console.log("Getting error : " + e);
                setErrorFetchingPlaylists(true);
            }
        };
        fetchData();
    }, []);


    // When playlistsData updates, check if there are more playlists to fetch
    // then update the state variable
    useEffect(() => {
        if (!playlistsData) {
            return;
        }

        // Playlist endpoint only returns 20 playlists at a time, so we need to
        // make sure we get ALL playlists by fetching the next set of playlists
        const fetchMoreData = async () => {
            if (playlistsData.next) {
                const { data } = await axios.get(playlistsData.next);
                setPlaylistsData(data);
            }
        };

        // Use functional update to update playlists state variable
        // to avoid including playlists as a dependency for this hook
        // and creating an infinite loop
        setPlaylists(playlists => ([
            ...playlists ? playlists : [],
            ...(playlistsData.items)
        ]));

        console.log("fetching more user playlists data")
        // Fetch next set of playlists as needed
        catchErrors(fetchMoreData());

    }, [playlistsData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserSavedTracks();
                console.log("fetching user tracks data");
                setTracksData(data);
            }
            catch {
                setErrorFetchingTracks(true);
            }
        };
        catchErrors(fetchData());
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
                const { data } = await axios.get(tracksData.next);
                setTracksData(data);
            }
        };

        // Use functional update to update tracks state variable
        // to avoid including tracks as a dependency for this hook
        // and creating an infinite loop
        setTracks(tracks => ([
            ...tracks ? tracks : [],
            ...(tracksData.items)
        ]));

        console.log("fetching more user tracks data")
        // Fetch next set of tracks as needed
        catchErrors(fetchMoreData());

    }, [tracksData]);


    return (
        <>
            <StyledButton onClick={handleAddTracksToPlaylists}>Add those {selectedTracksUris.length} tracks to {selectedPlaylistsId.length} playlists</StyledButton>
            <StyledNewGrid>
                <aside>
                    {playlists === null ? <ErrorOrLoader error={errorFetchingPlaylists} /> :
                        <>
                            <h3>There you can select your playlists</h3>
                            <PlaylistList
                                playlists={playlists}
                                selectedPlaylistsId={selectedPlaylistsId}
                                handleSelected={handleSelectedPlaylist}
                            />
                            <button style={{ marginTop: "25px" }}>New Playlist</button>
                        </>
                    }
                </aside>
                <section>
                    {tracks === null ? <ErrorOrLoader error={errorFetchingTracks} /> :
                        <>
                            <h3>There you can select your Tracks</h3>
                            <TrackCardList
                                tracks={tracks}
                                selectedTracksUris={selectedTracksUris}
                                handleSelectedTracks={handleSelectedTracks}
                            />
                        </>
                    }
                </section>
            </StyledNewGrid >
        </>
    );
}

export default EasyModification;