import { useEffect, useState } from "react";
import { ArtistsGrid, ErrorOrLoader, Layout, SectionWrapper, TimeRangeButtons } from "../../../commons/components";
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

    const links = [{ link: "", title: "Easy-Modification" }];

    if (!topArtists) {
        return (
            <Layout>
                <ErrorOrLoader error={errorFetchingArtists} />
            </Layout>
        );
    }

    return (
        <Layout>
            <SectionWrapper title="Top artists this month" extra={<TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />
            } links={links}>
                <ArtistsGrid artists={topArtists.items} />
            </SectionWrapper>
        </Layout>
    );
}

export default TopArtists