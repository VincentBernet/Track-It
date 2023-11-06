import { useEffect, useState } from "react";
import { ArtistsGrid, SectionWrapper, TimeRangeButtons } from "../../commons/components";
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
        return (<>Can't reach spotify API</>);
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