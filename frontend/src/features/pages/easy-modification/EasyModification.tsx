import { Layout, PlaylistList, TrackCardList, EasyModificationHeader, TemporaryComponent, Notification, SwitchButton } from '../../../commons/components';
import { StyledGreenButton, StyledNewGrid } from '../../../commons/styles';
import { useState, useEffect } from 'react';
import { getCurrentUserProfile, postAddTracksToPlaylist } from '../../../commons/spotify/requests';
import { profileData } from '../../../commons/spotify/responsesTypes';
import getWordingButtonTracksToPlaylists from './EasyModificationUtils';
import { Link, useNavigate } from 'react-router-dom';


const EasyModification = () => {
    /* Get Profile : For Fetching profile */
    const [profile, setProfile] = useState<profileData | null>(null);

    /* Selected Playlist(s) state : For sending list IDs of selected playlists */
    const [selectedPlaylists, setSelectedPlaylists] = useState<{ id: string, name: string }[]>([]);

    /* Selected Track(s) state : For sending list Uri of selected tracks */
    const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

    /* Post status : For displaying success/error messages after adding tracks to playlists or creating new playlist */
    const [playlistAdditionSuccess, setPlaylistAdditionSuccess] = useState<string[]>([]);
    const [playlistAdditionFailure, setPlaylistAdditionFailure] = useState<string[]>([]);

    /* Consultation mode state : For switching between consultation and edition */
    const [consultationMode, setConsultationMode] = useState<boolean>(localStorage.getItem("consultationMode") === "true");

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


    const handleSelectedPlaylist = ({ playlistId, playlistName }: { playlistId: string, playlistName: string }) => {
        if (selectedPlaylists.some(playlist => playlist.id === playlistId)) {
            setSelectedPlaylists(selectedPlaylists.filter((playlist) => (playlist.id !== playlistId)));
        } else {
            setSelectedPlaylists([...selectedPlaylists, { id: playlistId, name: playlistName }]);
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
        for (const playlist of selectedPlaylists) {
            try {
                await postAddTracksToPlaylist(playlist.id, selectedTracksUris);
                playlistAdditionSuccessTemp.push(playlist.id);
            }
            catch {
                playlistAdditionFailureTemp.push(playlist.name);
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

    const resetSelectedItems = () => {
        setSelectedPlaylists([]);
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
                    <StyledGreenButton onClick={handleAddTracksToPlaylists} disabled={(selectedTracksUris.length < 1 || selectedPlaylists.length < 1)}>
                        {getWordingButtonTracksToPlaylists(selectedTracksUris.length, selectedPlaylists.length)}
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
                            {consultationMode && <Link className="secondary-text" to="/playlists">See all</Link>}
                        </div>
                        <PlaylistList
                            profile={profile}
                            consultationMode={consultationMode}
                            playlistAdditionSuccess={playlistAdditionSuccess}
                            selectedPlaylists={selectedPlaylists}
                            handleOnDelete={() => setPlaylistAdditionSuccess([])}
                            handleSelected={handleSelectedPlaylist}
                        />

                    </aside>
                    <section>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '5px' }}>
                            <h3>Your liked Tracks</h3>
                            <SwitchButton checked={consultationMode} onChange={handleSwitchMode} />
                        </div>
                        <TrackCardList
                            consultationMode={consultationMode}
                            selectedTracksUris={selectedTracksUris}
                            handleSelectedTracks={handleSelectedTracks}
                        />
                    </section>
                </StyledNewGrid>
            </Layout >


            {playlistAdditionFailure.length > 0 && (
                <TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
                    <Notification status={"error"} message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`} />
                </TemporaryComponent>
            )}

        </>
    );
}

export default EasyModification;