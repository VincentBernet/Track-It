import { useState, useEffect } from 'react';
import { getCurrentUserProfile, getCurrentUserPlaylists, getCurrentUserTopArtists, getCurrentUserTopTracks } from '../../../commons/spotify/requests';
import { StyledHeader } from '../../../commons/styles';
import { profileData, playlistsData, topArtistsData, topTracksData } from '../../../commons/spotify/responsesTypes';
import { ArtistsGrid, SectionWrapper, TrackList, PlaylistsGrid, ErrorOrLoader } from '../../../commons/components';

const Profile = () => {
    const [profile, setProfile] = useState<profileData | null>(null);
    const [playlists, setPlaylists] = useState<playlistsData | null>(null);
    const [topArtists, setTopArtists] = useState<topArtistsData | null>(null);
    const [topTracks, setTopTracks] = useState<topTracksData | null>(null);

    const [errorFetchingProfile, setErrorFetchingProfile] = useState<boolean>(false);
    const [errorFetchingOther, setErrorFetchingOther] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getCurrentUserProfile();
                setProfile(userProfile.data);
            }
            catch (e) {
                setErrorFetchingProfile(true);
            }


            try {
                const userPlaylists = await getCurrentUserPlaylists();
                setPlaylists(userPlaylists.data);

                const userTopArtists = await getCurrentUserTopArtists();
                setTopArtists(userTopArtists.data);

                const userTopTracks = await getCurrentUserTopTracks();
                setTopTracks(userTopTracks.data);
            }
            catch (e) {
                setErrorFetchingOther(true);
            }
        };

        fetchData();
    }, []);

    if (!profile) {
        return (
            <ErrorOrLoader error={errorFetchingProfile} />
        );
    }

    return (
        <>
            <StyledHeader $type="user">
                <div className="header__inner">
                    {profile.images.length && profile.images[0].url && (
                        <img className="header__img" src={profile.images[0].url} alt="Avatar" />
                    )}
                    <div>
                        <div className="header__overline">Profile</div>
                        <h1 className="header__name">{profile.display_name}</h1>
                        <p className="header__meta">
                            {playlists && (
                                <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                            )}
                            <span>
                                {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                            </span>
                        </p>
                    </div>
                </div>
            </StyledHeader>

            {topArtists && topTracks && playlists ? (
                <main>
                    <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                        <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                    </SectionWrapper>
                    <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                        <TrackList tracks={topTracks.items.slice(0, 10)} />
                    </SectionWrapper>
                    <SectionWrapper title="Playlists" seeAllLink="/playlists">
                        <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                    </SectionWrapper>
                </main>
            ) : (
                <ErrorOrLoader error={errorFetchingOther} />
            )}
        </>
    )
};

export default Profile;