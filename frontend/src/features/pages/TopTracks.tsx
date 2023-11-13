import { useEffect, useState } from "react";
import { topTracksData } from "../../commons/spotify/responsesTypes";
import { getCurrentUserTopTracks } from "../../commons/spotify/requests";
import { Loader, SectionWrapper, TimeRangeButtons, TrackList } from "../../commons/components";

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState<topTracksData | null>(null);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    useEffect(() => {
        const fetchData = async () => {
            const userTopTracks = await getCurrentUserTopTracks(timeRange);
            setTopTracks(userTopTracks.data);
        }
        fetchData();
    }, [timeRange]);

    if (!topTracks) {
        return (
            <Loader />
        );
    }

    return (
        <main>
            <SectionWrapper title="Top tracks this month" breadcrumb>
                <TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />
                <TrackList tracks={topTracks.items} />
            </SectionWrapper>
        </main>);
}

export default TopTracks;