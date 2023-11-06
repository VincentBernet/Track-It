import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getPlaylistById, getAudioFeaturesForTracks } from '../../commons/spotify/requests';
import { catchErrors } from '../../commons/utils';
import { TrackList, SectionWrapper, Loader } from '../../commons/components';
import { StyledHeader, StyledDropdown } from '../../commons/styles';
import { tracksData, track, playlist } from "../../commons/spotify/responsesTypes";

const Playlist = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState<playlist | null>(null);
    const [tracksData, setTracksData] = useState<tracksData | null>(null);
    const [tracks, setTracks] = useState<track[] | null>(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [sortValue, setSortValue] = useState('');
    const sortOptions = ['danceability', 'tempo', 'energy'];

    // Get playlist data based on ID from route params
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id || 'test');
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

        // Also update the audioFeatures state variable using the track IDs
        const fetchAudioFeatures = async () => {
            const ids = tracksData.items.map(({ track }) => track.id).join(',');
            const { data } = await getAudioFeaturesForTracks(ids);
            setAudioFeatures(audioFeatures => ([
                ...audioFeatures ? audioFeatures : [],
                ...data['audio_features']
            ]));
        };
        catchErrors(fetchAudioFeatures());

    }, [tracksData]);

    // Map over tracks and add audio_features property to each track
    const tracksWithAudioFeatures = useMemo(() => {
        if (!tracks || !audioFeatures) {
            return null;
        }

        return tracks.map(({ track }) => {
            const trackToAdd = track;

            if (!track.audio_features) {
                const audioFeaturesObj = audioFeatures.find(item => {
                    if (!item || !track) {
                        return null;
                    }
                    return item.id === track.id;
                });

                trackToAdd['audio_features'] = audioFeaturesObj;
            }

            return trackToAdd;
        });
    }, [tracks, audioFeatures]);

    // Sort tracks by audio feature to be used in template
    const sortedTracks = useMemo(() => {
        if (!tracksWithAudioFeatures) {
            return null;
        }

        return [...tracksWithAudioFeatures].sort((a, b) => {
            const aFeatures = a['audio_features'];
            const bFeatures = b['audio_features'];

            if (!aFeatures || !bFeatures) {
                return false;
            }

            return bFeatures[sortValue] - aFeatures[sortValue];
        });
    }, [sortValue, tracksWithAudioFeatures]);

    return (
        <>
            {playlist && (
                <>
                    <StyledHeader>
                        <div className="header__inner">
                            {playlist.images.length && playlist.images[0].url && (
                                <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
                            )}
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
                        <SectionWrapper title="Playlist" breadcrumb={true}>
                            <StyledDropdown active={!!sortValue}>
                                <label className="sr-only" htmlFor="order-select">Sort tracks</label>
                                <select
                                    name="track-order"
                                    id="order-select"
                                    onChange={e => setSortValue(e.target.value)}
                                >
                                    <option value="">Sort tracks</option>
                                    {sortOptions.map((option, i) => (
                                        <option value={option} key={i}>
                                            {`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
                                        </option>
                                    ))}
                                </select>
                            </StyledDropdown>

                            {sortedTracks ? (
                                <TrackList tracks={sortedTracks} />
                            ) : (
                                <Loader />
                            )}
                        </SectionWrapper>
                    </main>
                </>
            )}
        </>
    );
};

export default Playlist;
