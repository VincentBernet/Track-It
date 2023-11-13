import { useEffect, useState } from "react";
import { ArtistsGrid, Loader, SectionWrapper, TimeRangeButtons } from "../../commons/components";
import { topArtistsData } from "../../commons/spotify/responsesTypes";
import { getCurrentUserTopArtists } from "../../commons/spotify/requests";

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<topArtistsData | null>(null);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    useEffect(() => {
        const fetchData = async () => {
            const userTopArtists = await getCurrentUserTopArtists(timeRange);
            setTopArtists(userTopArtists.data);
        };
        fetchData();
    }, [timeRange]);

    if (!topArtists) {
        return (
            <Loader />
        );
    }

    return (
        <main>
            <SectionWrapper title="Top artists this month" breadcrumb>
                <TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />
                <ArtistsGrid artists={topArtists.items} />
            </SectionWrapper>
        </main>
    );
}

export default TopArtists