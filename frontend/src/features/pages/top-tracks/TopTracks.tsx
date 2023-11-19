import { useEffect, useState } from "react";
import { topTracksData } from "../../../commons/spotify/responsesTypes";
import { getCurrentUserTopTracks } from "../../../commons/spotify/requests";
import { ErrorOrLoader, SectionWrapper, TimeRangeButtons, TrackList } from "../../../commons/components";

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<topTracksData | null>(null);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    const [errorFetchingTracks, setErrorFetchingTracks] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTopTracks = await getCurrentUserTopTracks(timeRange);
                setTopTracks(userTopTracks.data);
            }
            catch (e) {
                setErrorFetchingTracks(true);
            }
        }
        fetchData();
    }, [timeRange]);

    if (!topTracks) {
        return (
            <ErrorOrLoader error={errorFetchingTracks} />
        );
    }

    return (
        <main>
            <SectionWrapper title="Top tracks this month" breadcrumb>
                <TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />
                <TrackList tracks={topTracks.items} />
            </SectionWrapper>
        </main>
    );
}

export default TopTracks;