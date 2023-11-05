import { useState, useEffect } from 'react';
import { getCurrentUserProfile, getCurrentUserPlaylists, getCurrentUserTopArtists, getCurrentTopTracks } from '../../commons/spotify/requests';
import { StyledHeader } from '../../commons/styles';
import { profileData, playlistsData, topArtistsData, topTracksData } from '../../commons/spotify/responsesTypes';
import { ArtistsGrid, SectionWrapper, TrackList, PlaylistsGrid } from '../../commons/components';

const Profile = () => {
    const [profile, setProfile] = useState<profileData | null>(null);
    const [playlists, setPlaylists] = useState<playlistsData | null>(null);
    const [topArtists, setTopArtists] = useState<topArtistsData | null>(null);
    const [topTracks, setTopTracks] = useState<topTracksData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getCurrentUserProfile();
            setProfile(userProfile.data);

            const userPlaylists = await getCurrentUserPlaylists();
            setPlaylists(userPlaylists.data);

            const userTopArtists = await getCurrentUserTopArtists();
            setTopArtists(userTopArtists.data);

            const userTopTracks = await getCurrentTopTracks();
            setTopTracks(userTopTracks.data);
        };

        fetchData();
    }, []);

    return (
        <>
            {profile && (
                <>
                    <StyledHeader type="user">
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

                    <main>
                        {topArtists &&
                            <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                                <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                            </SectionWrapper>}
                        {topTracks &&
                            <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                                <TrackList tracks={topTracks.items.slice(0, 10)} />
                            </SectionWrapper>}
                        {playlists &&
                            <SectionWrapper title="Playlists" seeAllLink="/playlists">
                                <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                            </SectionWrapper>}
                    </main>
                </>
            )}
        </>
    )
};

export default Profile;