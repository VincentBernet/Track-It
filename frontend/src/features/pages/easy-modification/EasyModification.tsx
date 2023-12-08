import { Layout, PlaylistList, TrackCardList, EasyModificationHeader, TemporaryComponent, Notification, SwitchButton, Modal } from '../../../commons/components';
import { StyledGreenButton, StyledNewGrid } from '../../../commons/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists, getCurrentUserProfile, getCurrentUserSavedTracks, postAddTracksToPlaylist, postNewPlaylist } from '../../../commons/spotify/requests';
import { playlist, playlistsData, profileData, tracksData, tracksDataItem } from '../../../commons/spotify/responsesTypes';
import { catchErrors } from '../../../commons/utils';
import getWordingButtonTracksToPlaylists from './EasyModificationUtils';
import { Link, useNavigate } from 'react-router-dom';


const EasyModification = () => {
    /* Get Playlist : For Fetching playlists */
    const [playlistsData, setPlaylistsData] = useState<playlistsData | null>(null);
    const [playlists, setPlaylists] = useState<playlist[] | null>(null);
    const [errorFetchingPlaylists, setErrorFetchingPlaylists] = useState<boolean>(false);

    /* Get Tracks : For Fetching tracks */
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<tracksDataItem[] | null>(null);
    const [errorFetchingTracks, setErrorFetchingTracks] = useState<boolean>(false);

    /* Get Profile : For Fetching profile */
    const [profile, setProfile] = useState<profileData | null>(null);

    /* Post status : For displaying success/error messages after adding tracks to playlists or creating new playlist */
    const [playlistAdditionSuccess, setPlaylistAdditionSuccess] = useState<string[]>([]);
    const [playlistAdditionFailure, setPlaylistAdditionFailure] = useState<string[]>([]);

    /* Open modal creation new playlist */
    const [isModalNewPlaylistOpened, setIsModalNewPlaylistOpened] = useState<boolean>(false);
    const [playlistCreationFailure, setPlaylistCreationFailure] = useState<boolean>(false);

    /* Consultation mode state : For switching between consultation and edition */
    const [consultationMode, setConsultationMode] = useState<boolean>(localStorage.getItem("consultationMode") === "true");

    /* Selected Playlist(s) state : For sending list IDs of selected playlists */
    const [selectedPlaylistsId, setSelectedPlaylistsId] = useState<string[]>([]);

    /* Selected Track(s) state : For sending list Uri of selected tracks */
    const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

    /* Fetch first playlists batch on first render */
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

    /* Fetch profile on first render */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getCurrentUserProfile();
                setProfile(userProfile.data);
            }
            catch (e) {
                setProfile(null);
            }
        };
        fetchData();
    }, []);


    const handleSelectedPlaylist = (id: string) => {
        if (selectedPlaylistsId.includes(id)) {
            setSelectedPlaylistsId(selectedPlaylistsId.filter((playlistId) => playlistId !== id));
        } else {
            setSelectedPlaylistsId([...selectedPlaylistsId, id]);
        }
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

    const handleSwitchMode = () => {
        resetSelectedItems();
        localStorage.setItem("consultationMode", (!consultationMode).toString());
        setConsultationMode(!consultationMode);
    }

    const handleOnClickNewPlaylist = () => {
        setIsModalNewPlaylistOpened(true);
    }

    const handleOnCloseModalNewPlaylist = () => {
        setIsModalNewPlaylistOpened(false);
    }

    const handleCreateNewPlaylist = ({ playlistName, playlistDescription }:
        { playlistName: string, playlistDescription: string }) => {
        const fetchData = async () => {
            try {
                const { data } = await postNewPlaylist({ user_id: profile?.id || '', playlist_name: playlistName, playlist_description: playlistDescription });
                setPlaylists([...playlists ? playlists : [], data])
            }
            catch (e) {
                setPlaylistCreationFailure(true);
            }
        };
        fetchData();
    }

    const resetSelectedItems = () => {
        setSelectedPlaylistsId([]);
        setSelectedTracksUris([]);
    }

    const resetAllState = () => {
        resetSelectedItems();
        setPlaylistAdditionSuccess([]);
        setPlaylistAdditionFailure([]);
    }

    const navigate = useNavigate();

    return (
        <>
            <Layout
                extraHeader={<EasyModificationHeader profile={profile} />}
                bodyColor={"#000000"}
            >
                {!consultationMode ? (
                    <StyledGreenButton onClick={handleAddTracksToPlaylists}>
                        {getWordingButtonTracksToPlaylists(selectedTracksUris.length, selectedPlaylistsId.length)}
                    </StyledGreenButton>
                ) :
                    <>
                        <StyledGreenButton onClick={() => { navigate('/top-tracks'); }}> Check your top Tracks</StyledGreenButton>
                        <StyledGreenButton style={{ marginLeft: "15px" }} onClick={() => { navigate('/top-artists'); }}> Check your top Artists </StyledGreenButton>
                    </>
                }
                <StyledNewGrid>
                    <aside>
                        <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>Your Playlists</h3>
                            {consultationMode && <Link to="/playlists">See all</Link>}
                        </div>
                        <PlaylistList
                            playlists={playlists}
                            errorFetchingPlaylists={errorFetchingPlaylists}
                            consultationMode={consultationMode}
                            playlistAdditionSuccess={playlistAdditionSuccess}
                            selectedPlaylistsId={selectedPlaylistsId}
                            handleOnDelete={() => setPlaylistAdditionSuccess([])}
                            handleSelected={handleSelectedPlaylist}
                        />
                        {profile && playlists &&
                            <button onClick={() => handleOnClickNewPlaylist()} style={{ marginTop: "15px" }}>New Playlist</button>
                        }
                    </aside>
                    <section>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '10px' }}>
                            <h3>Your liked Tracks</h3>
                            <SwitchButton checked={consultationMode} onChange={handleSwitchMode} />
                        </div>
                        <TrackCardList
                            tracks={tracks}
                            errorFetchingTracks={errorFetchingTracks}
                            consultationMode={consultationMode}
                            selectedTracksUris={selectedTracksUris}
                            handleSelectedTracks={handleSelectedTracks}
                        />
                    </section>
                </StyledNewGrid>
            </Layout >

            {isModalNewPlaylistOpened && (
                <Modal onClose={handleOnCloseModalNewPlaylist} onValidate={handleCreateNewPlaylist} />
            )}

            {playlistAdditionFailure.length > 0 && (
                <TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
                    <Notification status={"error"} message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`} />
                </TemporaryComponent>
            )}

            {playlistCreationFailure && (
                <TemporaryComponent handleOnDelete={() => setPlaylistCreationFailure(false)}>
                    <Notification status={"error"} message={`Your playlist couldn't be created, try again later`} />
                </TemporaryComponent>
            )}
        </>
    );
}

export default EasyModification;