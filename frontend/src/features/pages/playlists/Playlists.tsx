import { useState, useEffect } from 'react';
import { getCurrentUserPlaylists } from '../../../commons/spotify/requests';
import { catchErrors } from '../../../commons/utils';
import { SectionWrapper, PlaylistsGrid, ErrorOrLoader, Layout } from '../../../commons/components';
import { playlistType, playlistsDataType } from "../../../commons/spotify/responsesTypes";
import axios from 'axios';


const Playlists = () => {
    const [playlistsData, setPlaylistsData] = useState<playlistsDataType | null>(null);
    const [playlists, setPlaylists] = useState<playlistType[] | null>(null);

    const [errorFetchingPlaylists, setErrorFetchingPlaylists] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserPlaylists();
                setPlaylistsData(data);
            }
            catch {
                setErrorFetchingPlaylists("Error fetching playlists");
            }

        };
        fetchData();
    }, []);

    // When playlistsData updates, check if there are more playlists to fetch
    // then update the state variable
    useEffect(() => {
        if (!playlistsData) {
            return;
        }

        // Playlist endpoint only returns 20 playlists at a time, so we need to
        // make sure we get ALL playlists by fetching the next set of playlists
        const fetchMoreData = async () => {
            if (playlistsData.next) {
                const { data } = await axios.get(playlistsData.next);
                setPlaylistsData(data);
            }
        };

        // Use functional update to update playlists state variable
        // to avoid including playlists as a dependency for this hook
        // and creating an infinite loop
        setPlaylists(playlists => ([
            ...playlists ? playlists : [],
            ...playlistsData.items
        ]));

        // Fetch next set of playlists as needed
        catchErrors(fetchMoreData());

    }, [playlistsData]);

    if (!playlists) {
        return (
            <ErrorOrLoader error={errorFetchingPlaylists} />
        );
    }

    return (
        <Layout>
            <SectionWrapper title="Public Playlists" links={[{ link: "", title: "Easy-Modification" }]}>
                <PlaylistsGrid playlists={playlists} />
            </SectionWrapper>
        </Layout>
    );
};

export default Playlists;