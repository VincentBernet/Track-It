import { useEffect, useState } from "react";
import { topTracksDataType } from "../../../commons/spotify/responsesTypes";
import { getCurrentUserTopTracks } from "../../../commons/spotify/requests";
import { ErrorOrLoader, Layout, SectionWrapper, TimeRangeButtons, TrackList } from "../../../commons/components";


const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<topTracksDataType | null>(null);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    const [errorFetchingTracks, setErrorFetchingTracks] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTopTracks = await getCurrentUserTopTracks(timeRange);
                setTopTracks(userTopTracks.data);
            }
            catch (e) {
                setErrorFetchingTracks("Error fetching top tracks");
            }
        }
        fetchData();
    }, [timeRange]);

    const links = [{ link: "", title: "Easy-Modification" }];

    if (!topTracks) {
        return (
            <Layout>
                <ErrorOrLoader error={errorFetchingTracks} />
            </Layout>
        );
    }

    return (
        <Layout>
            <SectionWrapper title="Top tracks this month" links={links} extra={
                <TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />
            }>
                <TrackList tracks={topTracks.items} />
            </SectionWrapper>
        </Layout>
    );
}

export default TopTracks;