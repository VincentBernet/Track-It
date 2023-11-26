import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrackById } from "../../../commons/spotify/requests";
import { ErrorOrLoader, Layout } from "../../../commons/components";
import { track } from './../../../commons/spotify/responsesTypes';
import styled from "styled-components";

const StyledTrackCard = styled.div`
    img {
        width: 200px;
    }
`;

const Track = () => {
    const { id } = useParams();

    const [track, setTrack] = useState<track | null>(null);
    const [errorFetchingTrack, setErrorFetchingTrack] = useState<boolean>(false);

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
    }, []);

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
                <div>{track.name}</div>
                {track.album.images.length && track.album.images[0] ? (
                    <img src={track.album.images[0].url} alt={`${track.name} thumbnail`} />
                ) : <img src={'/images/default_image.png'} alt={`${track.name} default thumbnail`} />
                }
                <p>{JSON.stringify(track)}</p>
            </StyledTrackCard>
        </Layout >
    );
};

export default Track;