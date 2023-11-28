import { Layout, ErrorOrLoader, PlaylistList, TrackCardList, EasyModificationHeader, TemporaryComponent, Notification, SwitchButton } from '../../../commons/components';
import { StyledGreenButton, StyledNewGrid } from '../../../commons/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists, getCurrentUserSavedTracks, postAddTracksToPlaylist } from '../../../commons/spotify/requests';
import { playlist, playlistsData, tracksData, tracksDataItem } from '../../../commons/spotify/responsesTypes';
import { catchErrors } from '../../../commons/utils';


const EasyModification = () => {
    /* Get Playlist : For Fetching playlists */
    const [playlistsData, setPlaylistsData] = useState<playlistsData | null>(null);
    const [playlists, setPlaylists] = useState<playlist[] | null>(null);
    const [errorFetchingPlaylists, setErrorFetchingPlaylists] = useState<boolean>(false);

    /* Get Tracks : For Fetching tracks */
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<tracksDataItem[] | null>(null);
    const [errorFetchingTracks, setErrorFetchingTracks] = useState<boolean>(false);

    /* Mode : For switching between consultation and edition */
    const [consultationMode, setConsultationMode] = useState<boolean>(true);

    /* For sending list IDs of selected playlists */
    const [selectedPlaylistsId, setSelectedPlaylistsId] = useState<string[]>([]);

    /* For sending list Uri of selected tracks */
    const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

    /* Post status : For displaying success/error messages after adding tracks to playlists */
    const [playlistAdditionSuccess, setPlaylistAdditionSuccess] = useState<string[]>([]);
    const [playlistAdditionFailure, setPlaylistAdditionFailure] = useState<string[]>([]);


    const handleSelectedPlaylist = (id: string) => {
        if (selectedPlaylistsId.includes(id)) {
            setSelectedPlaylistsId(selectedPlaylistsId.filter((playlistId) => playlistId !== id));
        } else {
            setSelectedPlaylistsId([...selectedPlaylistsId, id]);
        }
    }

    const handleOnDelete = () => {
        setPlaylistAdditionSuccess([]);
    }

    const handleSelectedTracks = (uri: string) => {
        if (selectedTracksUris.includes(uri)) {
            setSelectedTracksUris(selectedTracksUris.filter((trackUri) => trackUri !== uri));
        } else {
            setSelectedTracksUris([...selectedTracksUris, uri]);
        }
    }

    const handleAddTracksToPlaylists = async () => {
        resetAllState();
        const playlistAdditionSuccessTemp: string[] = [];
        const playlistAdditionFailureTemp: string[] = [];
        for (const playlistId of selectedPlaylistsId) {
            try {
                await postAddTracksToPlaylist(playlistId, selectedTracksUris);
                playlistAdditionSuccessTemp.push(playlistId);
            }
            catch {
                playlistAdditionFailureTemp.push(playlists?.find((playlist) => playlist.id === playlistId)?.name || "");
            }
        }
        setPlaylistAdditionSuccess(playlistAdditionSuccessTemp);
        setPlaylistAdditionFailure(playlistAdditionFailureTemp);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserPlaylists();
                setPlaylistsData(data);
            }
            catch (e) {
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

        // Fetch next set of playlists as needed
        catchErrors(fetchMoreData());

    }, [playlistsData]);

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

        // Fetch next set of tracks as needed
        catchErrors(fetchMoreData());

    }, [tracksData]);

    const handleSwitchMode = () => {
        resetAllState();
        setConsultationMode(!consultationMode);
    }

    const resetAllState = () => {
        setSelectedPlaylistsId([]);
        setSelectedTracksUris([]);
        setPlaylistAdditionSuccess([]);
        setPlaylistAdditionFailure([]);
    }

    return (
        <Layout
            extraHeader={<EasyModificationHeader />}
            bodyColor={"#000000"}
        >
            {!consultationMode &&
                <StyledGreenButton onClick={handleAddTracksToPlaylists}>
                    {
                        // TODO : reformater cette immondice de ternaire ^^'
                        selectedTracksUris.length === 0 && selectedPlaylistsId.length === 0 ?
                            "First select tracks and playlists bellow" :
                            selectedPlaylistsId.length === 0 ?
                                "Then select the playlist where you want to add the tracks" :
                                selectedTracksUris.length === 0 ?
                                    "Then select the tracks to be added" :
                                    selectedTracksUris.length === 1 ?
                                        `Add 1 track to ${selectedPlaylistsId.length} playlist` :
                                        selectedPlaylistsId.length === 1 ?
                                            `Add ${selectedTracksUris.length} tracks to 1 playlist` :
                                            `Add ${selectedTracksUris.length} tracks to ${selectedPlaylistsId.length} playlists`
                    }
                </StyledGreenButton>
            }
            <StyledNewGrid $hasMoreMargin={consultationMode}>
                <aside>
                    {playlists === null ? <ErrorOrLoader error={errorFetchingPlaylists} /> :
                        <>
                            <h3 style={{ marginBottom: '10px' }}>Your Playlists</h3>
                            <PlaylistList
                                playlists={playlists}
                                consultationMode={consultationMode}
                                playlistAdditionSuccess={playlistAdditionSuccess}
                                selectedPlaylistsId={selectedPlaylistsId}
                                handleOnDelete={handleOnDelete}
                                handleSelected={handleSelectedPlaylist}
                            />
                            <button style={{ marginTop: "25px" }}>New Playlist</button>
                        </>
                    }
                </aside>
                <section>
                    {tracks === null ? <ErrorOrLoader error={errorFetchingTracks} /> :
                        <>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '10px' }}>
                                <h3>Your Tracks</h3>
                                <SwitchButton onChange={handleSwitchMode} />
                            </div>
                            <TrackCardList
                                tracks={tracks}
                                consultationMode={consultationMode}
                                selectedTracksUris={selectedTracksUris}
                                handleSelectedTracks={handleSelectedTracks}
                            />
                        </>
                    }
                </section>
            </StyledNewGrid >

            {playlistAdditionFailure.length > 0 && (
                <TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
                    <Notification status={"error"} message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`} />
                </TemporaryComponent>
            )}
        </Layout>
    );
}

export default EasyModification;