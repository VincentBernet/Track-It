import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { catchErrors } from '../../commons/utils'
import { getPlaylistById } from '../../commons/spotify/requests';
import { StyledHeader } from '../../commons/styles';
import { playlist, complexeTrack, tracksData } from '../../commons/spotify/responsesTypes';
import axios from 'axios';
import { SectionWrapper, TrackList } from '../../commons/components';


const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState<playlist | null>(null);
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<complexeTrack[] | null>(null);

    const tracksForTrackList = useMemo(() => {
        if (!tracks) {
            return [];
        }
        return tracks.map(({ track }) => track);
    }, [tracks]);


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id || 'testId');
            setPlaylist(data);
            setTracksData(data.tracks);
        };

        catchErrors(fetchData());
    }, [id]);

    // When tracksData updates, compile arrays of tracks and audioFeatures
    useEffect(() => {
        if (!tracksData) {
            return;
        }

        // When tracksData updates, check if there are more tracks to fetch
        // then update the state variable
        const fetchMoreData = async () => {
            if (tracksData.next) {
                const { data } = await axios.get(tracksData.next);
                setTracksData(data);
            }
        };

        setTracks(tracks => ([
            ...tracks ? tracks : [],
            ...tracksData.items
        ]));

        catchErrors(fetchMoreData());
    }, [tracksData]);

    if (!playlist) {
        return (<>Can't reach spotify API</>);
    }

    return (
        <>
            <StyledHeader>
                <div className="header__inner">
                    {playlist.images.length && playlist.images[0].url ? (
                        <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
                    ) : null}
                    <div>
                        <div className="header__overline">Playlist</div>
                        <h1 className="header__name">{playlist.name}</h1>
                        <p className="header__meta">
                            {playlist.followers.total ? (
                                <span>{playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}</span>
                            ) : null}
                            <span>{playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}</span>
                        </p>
                    </div>
                </div>
            </StyledHeader>

            <main>
                <SectionWrapper title="Playlist" breadcrumb>
                    {tracks && (
                        <TrackList tracks={tracksForTrackList} />
                    )}
                </SectionWrapper>
            </main>
        </>
    )
}

export default Playlist;