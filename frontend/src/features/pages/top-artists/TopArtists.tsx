import { useEffect, useState } from "react";
import { ArtistsGrid, ErrorOrLoader, SectionWrapper, TimeRangeButtons } from "../../../commons/components";
import { topArtistsData } from "../../../commons/spotify/responsesTypes";
import { getCurrentUserTopArtists } from "../../../commons/spotify/requests";

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState<topArtistsData | null>(null);
    const [timeRange, setTimeRange] = useState<string>('short_term');

    const [errorFetchingArtists, setErrorFetchingArtists] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTopArtists = await getCurrentUserTopArtists(timeRange);
                setTopArtists(userTopArtists.data);
            }
            catch (e) {
                console.log("Getting error : " + e);
                setErrorFetchingArtists(true);
            }
        };
        fetchData();
    }, [timeRange]);

    if (!topArtists) {
        return (
            <ErrorOrLoader error={errorFetchingArtists} />
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