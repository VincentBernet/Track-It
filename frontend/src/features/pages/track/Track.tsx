import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecommendations, getTrackById } from "../../../commons/spotify/requests";
import { ErrorOrLoader, Layout, SectionWrapper } from "../../../commons/components";
import { track } from './../../../commons/spotify/responsesTypes';
import styled from "styled-components";
import { StyledGreenButton } from "../../../commons/styles";


const Track = () => {
    const { id } = useParams();

    const [track, setTrack] = useState<track | null>(null);
    const [errorFetchingTrack, setErrorFetchingTrack] = useState<boolean>(false);

    const [tracksReco, setTracksReco] = useState<track[] | null>(null);
    const [errorFechingRecommendedTracks, setErrorFetchingRecommendedTracks] = useState<boolean>(false);

    const [indexReco, setIndexReco] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getTrackById(id || '');
                setTrack(data);
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

    const handleNextRecommendation = () => {
        if (!tracksReco) {
            return;
        }
        if (indexReco >= tracksReco.length) {
            setIndexReco(0);
            return;
        }
        setIndexReco(indexReco + 1);
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
                                    {track.album.images.length && track.album.images[0] ? (
                                        <img src={track.album.images[0].url} alt={`${track.name} thumbnail`} />
                                    ) : <img src={'/images/default_image.png'} alt={`${track.name} default thumbnail`} />
                                    }
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
                                    <StyledGreenButton onClick={handleNextRecommendation}>New recommandation</StyledGreenButton>
                                </div>
                            </div>
                            <div>
                                <img className={"right__arrow__icone"} src={'/images/right_arrow.png'} alt={`${track.name} default thumbnail`} />
                            </div>

                            <div className={"section__card__music v2"}>
                                {tracksReco === null ? <ErrorOrLoader error={errorFechingRecommendedTracks} /> :
                                    <>
                                        <div>
                                            {tracksReco[indexReco].album.images.length && tracksReco[indexReco].album.images[0] ? (
                                                <img src={tracksReco[indexReco].album.images[0].url} alt={`${tracksReco[indexReco].name} thumbnail`} />
                                            ) : <img src={'/images/default_image.png'} alt={`${tracksReco[indexReco].name} default thumbnail`} />
                                            }
                                        </div>
                                        <div>
                                            <h1>{tracksReco[indexReco].name}</h1>
                                            <h2>{tracksReco[indexReco].artists[0].name}</h2>
                                            <p>{tracksReco[indexReco].album.name} in {tracksReco[indexReco].album.release_date}</p>
                                            <StyledGreenButton>Play on Spotify</StyledGreenButton>
                                            <br />
                                            <br />
                                            <StyledGreenButton>Like button</StyledGreenButton>
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
    img {
        width: 300px;
        border-radius: 8px;
    }
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