import { Layout, PlaylistList, TrackCardList, EasyModificationHeader, TemporaryComponent, Notification } from '../../../commons/components';
import { StyledGreenButton, StyledNewGrid } from '../../../commons/styles';
import { useState, useEffect } from 'react';
import { getCurrentUserProfile, postAddTracksToPlaylist } from '../../../commons/spotify/requests';
import { profileDataType } from '../../../commons/spotify/responsesTypes';
import { getWordingButtonTracksToPlaylists, playlistType } from './EasyModificationUtils';
import { Link } from 'react-router-dom';


const EasyModification = () => {
    /* Get Profile : For Fetching profile */
    const [profile, setProfile] = useState<profileDataType | null>(null);

    /* Selected Playlist(s) state : For sending list IDs of selected playlists */
    const [selectedPlaylists, setSelectedPlaylists] = useState<playlistType[]>([]);

    /* Selected Track(s) state : For sending list Uri of selected tracks */
    const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

    /* Post status : For displaying success/error messages after adding tracks to playlists or creating new playlist */
    const [playlistAdditionSuccess, setPlaylistAdditionSuccess] = useState<string[]>([]);
    const [playlistAdditionFailure, setPlaylistAdditionFailure] = useState<string[]>([]);

    /* Selected Playlist(s) state : For sending list IDs of selected playlists */
    const [visiblePlaylist, setVisiblePlaylist] = useState<playlistType>({ id: '', name: 'likedTrack' });

    /* ------------------------------------------------------------------------------------------------------------- */
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


    const handleSelectedPlaylist = ({ id, name }: playlistType) => {
        if (selectedPlaylists.some(playlist => playlist.id === id)) {
            setSelectedPlaylists(selectedPlaylists.filter((playlist) => (playlist.id !== id)));
        } else {
            setSelectedPlaylists([...selectedPlaylists, { id: id, name: name }]);
        }
    }

    const handleVisiblePlaylist = ({ id, name }: playlistType) => {
        setVisiblePlaylist({ id: id, name: name });
    }

    const handleOnDelete = () =>
        setPlaylistAdditionSuccess([]);

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

    const resetSelectedItems = () => {
        setSelectedPlaylists([]);
        setSelectedTracksUris([]);
    }

    const resetAllState = () => {
        resetSelectedItems();
        setPlaylistAdditionSuccess([]);
        setPlaylistAdditionFailure([]);
    }

    return (
        <>
            <Layout
                extraHeader={<EasyModificationHeader profile={profile} />}
                bodyColor={"#000000"}
                fixedMainPadding='32px 32px 32px 32px'
            >
                <div style={{
                    marginBottom: '10px', display: "flex", gap: "30px", alignItems: "center", padding: "15px 15px 15px 15px",
                    background: "var(--new-light-grey)",
                    borderRadius: "15px",
                }}>
                    <StyledGreenButton onClick={handleAddTracksToPlaylists} disabled={(selectedTracksUris.length < 1 || selectedPlaylists.length < 1)}>
                        {getWordingButtonTracksToPlaylists(selectedTracksUris.length, selectedPlaylists.length)}
                    </StyledGreenButton>
                </div>
                <StyledNewGrid>
                    <aside>
                        <div style={{ marginBottom: '10px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>Your Playlists</h3>
                            <Link className="secondary-text" to="/playlists">See all</Link>
                        </div>
                        <PlaylistList
                            profile={profile}
                            playlistAdditionSuccess={playlistAdditionSuccess}
                            selectedPlaylists={selectedPlaylists}
                            handleVisiblePlaylist={handleVisiblePlaylist}
                            handleOnDelete={handleOnDelete}
                            handleSelected={handleSelectedPlaylist}
                        />
                    </aside>
                    <section>
                        <TrackCardList
                            selectedTracksUris={selectedTracksUris}
                            visiblePlaylist={visiblePlaylist}
                            handleSelectedTracks={handleSelectedTracks}
                        />
                    </section>
                </StyledNewGrid>
            </Layout >


            {
                playlistAdditionFailure.length > 0 && (
                    <TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
                        <Notification status={"error"} message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`} />
                    </TemporaryComponent>
                )
            }
            {
                playlistAdditionFailure.length > 0 && (
                    <TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
                        <Notification status={"error"} message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`} />
                    </TemporaryComponent>
                )
            }

        </>
    );
}

export default EasyModification;