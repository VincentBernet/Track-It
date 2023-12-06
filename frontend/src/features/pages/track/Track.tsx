import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecommendations, getTrackById, checkIfTrackIsSaved, addToLikedTracks, removeFromLikedTracks } from "../../../commons/spotify/requests";
import { Artwork, ErrorOrLoader, Layout, SectionWrapper } from "../../../commons/components";
import { track } from './../../../commons/spotify/responsesTypes';
import styled from "styled-components";
import { StyledGreenButton } from "../../../commons/styles";


const Track = () => {
    const { id } = useParams();

    const [track, setTrack] = useState<track | null>(null);
    const [errorFetchingTrack, setErrorFetchingTrack] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean | null>(null);

    const [tracksReco, setTracksReco] = useState<track[] | null>(null);
    const [errorFechingRecommendedTracks, setErrorFetchingRecommendedTracks] = useState<boolean>(false);

    const [indexReco, setIndexReco] = useState<number>(0);
    const [recoIsLiked, setRecoIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getTrackById(id || '');
                setTrack(data);
                checkIfTrackIsSavedInLikedTracks(data.id);
            }
            catch {
                setErrorFetchingTrack(true);
            }
        };
        fetchData();
    }, [id]);


    useEffect(() => {
        if (!track) {
            return;
        }
        const fetchData = async () => {
            try {
                const { data } = await getRecommendations({
                    tracksId: [track.id]
                }
                );
                setTracksReco(data.tracks);
            }
            catch {
                setErrorFetchingRecommendedTracks(true);
            }
        };
        fetchData();
    }, [track]);

    const checkIfTrackIsSavedInLikedTracks = async (id: string) => {
        try {
            const { data } = await checkIfTrackIsSaved([id]);
            setIsLiked(data[0]);
        }
        catch {
            console.log("error during checking if track is saved")
        }
    }

    const handleNextRecommendation = () => {
        setRecoIsLiked(false);
        if (!tracksReco) {
            return;
        }
        if (indexReco >= tracksReco.length - 1) {
            setIndexReco(0);
            return;
        }
        setIndexReco(indexReco + 1);
    }

    const handleLikeTrack = (track_id: string) => {
        if (!isLiked) {
            try {
                addToLikedTracks([track_id]);
                setIsLiked(!isLiked);
            }
            catch {
                setIsLiked(false);
                console.log("error during liking current track");
            }
        }
        else {
            try {
                removeFromLikedTracks([track_id]);
                setIsLiked(!isLiked);
            }
            catch {
                setIsLiked(true);
                console.log("error during un-liking current track");
            }
        }
    }

    const handleLikeRecoTrack = (track_id: string) => {
        if (!recoIsLiked) {
            try {
                addToLikedTracks([track_id]);
                setRecoIsLiked(!recoIsLiked);
            }
            catch {
                setRecoIsLiked(false);
                console.log("error during liking reco track");
            }
        }
        else {
            try {
                removeFromLikedTracks([track_id]);
                setRecoIsLiked(!recoIsLiked);
            }
            catch {
                setRecoIsLiked(true);
                console.log("error during un-liking reco track");
            }
        }
    }

    const links = [
        { link: "", title: "Easy-Modification" },
        { link: "profile", title: "Profile" },
        { link: "playlists", title: "Playlists" },
    ];

    if (!track) {
        return (
            <Layout>
                <ErrorOrLoader error={errorFetchingTrack} />
            </Layout>
        );
    }

    return (
        <Layout>
            <StyledTrackCard>
                <SectionWrapper title={"Track"} links={links} forcedWidth="80%">
                    <div className={"section__centered"}>
                        <div className={"section__flex"}>
                            <div className={"section__card__music"}>
                                <div>
                                    <Artwork
                                        images={track.album.images}
                                        alt={track.name}
                                        size={"300px"}
                                        isRounded
                                    />
                                </div>
                                <div>
                                    <h1>{track.name}</h1>
                                    <h2>{track.artists[0].name}</h2>
                                    <p>{track.album.name} in {track.album.release_date}</p>
                                    <StyledGreenButton onClick={() => {
                                        window.open(track.external_urls.spotify);
                                        return null;
                                    }}>Play on Spotify</StyledGreenButton>
                                    <br />
                                    <br />
                                    <StyledGreenButton onClick={handleNextRecommendation}>New recommendation</StyledGreenButton>
                                    <br />
                                    <br />
                                    {isLiked !== null &&
                                        <button onClick={() => handleLikeTrack(track.id)} aria-label={"Liked current music"}>
                                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    fill={isLiked ? "#1DB954" : "none"}
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    stroke="white"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                                />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                            <div>
                                <img className={"right__arrow__icone"} src={'/images/right_arrow.png'} alt={`righ arrow image`} />
                            </div>

                            <div className={"section__card__music v2"}>
                                {tracksReco === null ? <ErrorOrLoader error={errorFechingRecommendedTracks} /> :
                                    <>
                                        <div>
                                            <Artwork
                                                images={tracksReco[indexReco].album.images}
                                                alt={tracksReco[indexReco].name}
                                                size={"300px"}
                                                isRounded
                                            />
                                        </div>
                                        <div>
                                            <h1>{tracksReco[indexReco].name}</h1>
                                            <h2>{tracksReco[indexReco].artists[0].name}</h2>
                                            <p>{tracksReco[indexReco].album.name} in {tracksReco[indexReco].album.release_date}</p>
                                            <StyledGreenButton onClick={() => {
                                                window.open(tracksReco[indexReco].external_urls.spotify);
                                                return null;
                                            }}>Play on Spotify</StyledGreenButton>
                                            <br />
                                            <br />
                                            <button onClick={() => handleLikeRecoTrack(tracksReco[indexReco].id)} aria-label={"Liked recommended music"}>
                                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        fill={recoIsLiked ? "#1DB954" : "none"}
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        stroke="white"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </StyledTrackCard>
        </Layout >
    );
};

const StyledTrackCard = styled.section`
    .right__arrow__icone {
        width: 50px;
        height: 50px;
    }
    .section__flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .section__card__music {
        display: flex;
        gap: 20px;
    }
    .v2 {
        justify-content: flex-end;
    }
`;

export default Track;