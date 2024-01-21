import { useState, useEffect } from 'react';
import { getCurrentUserProfile, getCurrentUserPlaylists, getCurrentUserTopArtists, getCurrentUserTopTracks } from '../../../commons/spotify/requests';
import { profileDataType, playlistsDataType, topArtistsDataType, topTracksDataType } from '../../../commons/spotify/responsesTypes';
import { ArtistsGrid, SectionWrapper, TrackList, PlaylistsGrid, ErrorOrLoader, Layout } from '../../../commons/components';
import { StyledHeader } from '../../../commons/styles';

const Profile = () => {
    const [profile, setProfile] = useState<profileDataType | null>(null);
    const [playlists, setPlaylists] = useState<playlistsDataType | null>(null);
    const [topArtists, setTopArtists] = useState<topArtistsDataType | null>(null);
    const [topTracks, setTopTracks] = useState<topTracksDataType | null>(null);

    const [errorFetchingProfile, setErrorFetchingProfile] = useState<string | null>(null);
    const [errorFetchingOther, setErrorFetchingOther] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getCurrentUserProfile();
                setProfile(userProfile.data);
            }
            catch (e) {
                setErrorFetchingProfile("Error fetching profile");
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
                setErrorFetchingOther("Error fetching playlists, top artists, or top tracks");
            }
        };

        fetchData();
    }, []);

    if (!profile) {
        return (
            <Layout>
                <ErrorOrLoader error={errorFetchingProfile} />
            </Layout>
        );
    }

    return (
        <Layout fixedMainPadding='64px 19% 64px 19%' extraHeader={
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
        }>
            {topArtists && topTracks && playlists ? (
                <>
                    <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                        <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                    </SectionWrapper>
                    <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                        <TrackList tracks={topTracks.items.slice(0, 10)} />
                    </SectionWrapper>
                    <SectionWrapper title="Playlists" seeAllLink="/playlists">
                        <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                    </SectionWrapper>
                </>
            ) : (
                <ErrorOrLoader error={errorFetchingOther} />
            )}
        </Layout>
    )
};

export default Profile;