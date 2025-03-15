import { useEffect, useState } from "react";
import { ArtistsGrid, ErrorOrLoader, Layout, SectionWrapper, TimeRangeButtons } from "../../../commons/components";
import { getCurrentUserTopArtists } from "../../../commons/spotify/requests";
import type { TopArtistsData } from "../../../commons/spotify/responsesTypes";

const TopArtists = () => {
	const [topArtists, setTopArtists] = useState<TopArtistsData | null>(null);
	const [timeRange, setTimeRange] = useState<string>("short_term");

	const [errorFetchingArtists, setErrorFetchingArtists] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userTopArtists = await getCurrentUserTopArtists(timeRange);
				setTopArtists(userTopArtists.data);
			} catch (e) {
				setErrorFetchingArtists("Error fetching top artists");
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
			<SectionWrapper
				title="Top artists this month"
				extra={<TimeRangeButtons timeRange={timeRange} handleClick={setTimeRange} />}
				links={links}
			>
				<ArtistsGrid artists={topArtists.items} />
			</SectionWrapper>
		</Layout>
	);
};

export default TopArtists;
