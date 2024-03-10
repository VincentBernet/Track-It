import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecommendations, getTrackById, checkIfTrackIsSaved, addToLikedTracks, removeFromLikedTracks } from "../../../commons/spotify/requests";
import { Artwork, ErrorOrLoader, Layout, SectionWrapper } from "../../../commons/components";
import { trackType } from './../../../commons/spotify/responsesTypes';
import styled from "styled-components";
import { StyledGreenButton } from "../../../commons/styles";
import { DoubleArrowSvg, HeartSvg } from "../../../commons/components/icons";


const Track = () => {
    const { id } = useParams();

    const [track, setTrack] = useState<trackType | null>(null);
    const [errorFetchingTrack, setErrorFetchingTrack] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState<boolean | null>(null);

    const [tracksReco, setTracksReco] = useState<trackType[] | null>(null);
    const [errorFechingRecommendedTracks, setErrorFetchingRecommendedTracks] = useState<string | null>(null);

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
                setErrorFetchingTrack("Error fetching track");
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
                setErrorFetchingRecommendedTracks("Error fetching recommended track");
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
            setErrorFetchingTrack("Error fetching track is liked or not");
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
                console.error("error during liking current track");
            }
        }
        else {
            try {
                removeFromLikedTracks([track_id]);
                setIsLiked(!isLiked);
            }
            catch {
                setIsLiked(true);
                console.error("error during un-liking current track");
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
                console.error("error during liking reco track");
            }
        }
        else {
            try {
                removeFromLikedTracks([track_id]);
                setRecoIsLiked(!recoIsLiked);
            }
            catch {
                setRecoIsLiked(true);
                console.error("error during un-liking reco track");
            }
        }
    }

    const links = [
        { link: "", title: "Easy-Modification" },
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
                <SectionWrapper title={"Track"} links={links}>
                    <div className="tracks_flex_section">
                        <div className="track_section">
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
                                <StyledGreenButton onClick={handleNextRecommendation}>New reco</StyledGreenButton>
                                <br />
                                <br />
                                {isLiked !== null &&
                                    <button onClick={() => handleLikeTrack(track.id)} aria-label={"Liked current music"}>
                                        <HeartSvg isLiked={isLiked} />
                                    </button>
                                }
                            </div>
                        </div>

                        <div>
                            <DoubleArrowSvg />
                        </div>


                        <div className="track_section justify_end">
                            {tracksReco === null ? <ErrorOrLoader error={errorFechingRecommendedTracks} minHeight="0vh" /> :
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
                                            <HeartSvg isLiked={recoIsLiked} />
                                        </button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </SectionWrapper>
            </StyledTrackCard>
        </Layout >
    );
};

const StyledTrackCard = styled.section`
    .tracks_flex_section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .track_section { 
        display: flex;
        width: 550px;
        gap: 20px;
    }
    .justify_end {
        justify-content: flex-end;
    }
`;

export default Track;