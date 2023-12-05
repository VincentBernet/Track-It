import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecommendations, getTrackById } from "../../../commons/spotify/requests";
import { Artwork, ErrorOrLoader, Layout, SectionWrapper } from "../../../commons/components";
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
        if (indexReco >= tracksReco.length - 1) {
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
                                </div>
                            </div>
                            <div>
                                <img className={"right__arrow__icone"} src={'/images/right_arrow.png'} alt={`${track.name} default thumbnail`} />
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