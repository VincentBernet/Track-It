import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Artwork, ErrorOrLoader, Layout, SectionWrapper } from "../../../commons/components";
import { DoubleArrowSvg, HeartSvg } from "../../../commons/components/icons";
import {
	addToLikedTracks,
	checkIfTrackIsSaved,
	getRecommendations,
	getTrackById,
	removeFromLikedTracks,
} from "../../../commons/spotify/requests";
import type { Track as _Track } from "./../../../commons/spotify/responsesTypes";

const Track = () => {
	const { id } = useParams();

	const [track, setTrack] = useState<_Track | null>(null);
	const [errorFetchingTrack, setErrorFetchingTrack] = useState<string | null>(null);
	const [isLiked, setIsLiked] = useState<boolean | null>(null);

	const [tracksReco, setTracksReco] = useState<_Track[] | null>(null);
	const [errorFechingRecommendedTracks, setErrorFetchingRecommendedTracks] = useState<string | null>(null);

	const [indexReco, setIndexReco] = useState<number>(0);
	const [recoIsLiked, setRecoIsLiked] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getTrackById(id || "");
				setTrack(data);
				checkIfTrackIsSavedInLikedTracks(data.id);
			} catch {
				setErrorFetchingTrack("Error fetching track");
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (!track) {
			return;
		}
		const fetchData = async () => {
			try {
				const { data } = await getRecommendations({
					tracksId: [track.id],
				});
				setTracksReco(data.tracks);
			} catch {
				setErrorFetchingRecommendedTracks("Error fetching recommended track");
			}
		};
		fetchData();
	}, [track]);

	const checkIfTrackIsSavedInLikedTracks = async (id: string) => {
		try {
			const { data } = await checkIfTrackIsSaved([id]);
			setIsLiked(data[0]);
		} catch {
			setErrorFetchingTrack("Error fetching track is liked or not");
		}
	};

	const handleNextRecommendation = () => {
		setRecoIsLiked(false);
		if (!tracksReco) {
			return;
		}
		if (indexReco >= tracksReco.length - 1) {
			setIndexReco(0);
			return;
		}
		setIndexReco(indexReco + 1);
	};

	const handleLikeTrack = (trackId: string) => {
		if (isLiked) {
			try {
				removeFromLikedTracks([trackId]);
				setIsLiked(!isLiked);
			} catch {
				setIsLiked(true);
				console.error("error during un-liking current track");
			}
		} else {
			try {
				addToLikedTracks([trackId]);
				setIsLiked(!isLiked);
			} catch {
				setIsLiked(false);
				console.error("error during liking current track");
			}
		}
	};

	const handleLikeRecoTrack = (trackId: string) => {
		if (recoIsLiked) {
			try {
				removeFromLikedTracks([trackId]);
				setRecoIsLiked(!recoIsLiked);
			} catch {
				setRecoIsLiked(true);
				console.error("error during un-liking reco track");
			}
		} else {
			try {
				addToLikedTracks([trackId]);
				setRecoIsLiked(!recoIsLiked);
			} catch {
				setRecoIsLiked(false);
				console.error("error during liking reco track");
			}
		}
	};

	const links = [{ link: "", title: "Easy-Modification" }];

	if (!track) {
		return (
			<Layout>
				<ErrorOrLoader error={errorFetchingTrack} />
			</Layout>
		);
	}

	return (
		<Layout>
			<div>
				<SectionWrapper title={"Track"} links={links}>
					<div className="tracks_flex_section">
						<div className="track_section">
							<div>
								<Artwork images={track.album.images} alt={track.name} size={"300px"} /*isRounded*/ />
							</div>
							<div>
								<h1>{track.name}</h1>
								<h2>{track.artists[0].name}</h2>
								<p>
									{track.album.name} in {track.album.release_date}
								</p>
								<button
									type="button"
									onClick={() => {
										window.open(track.external_urls.spotify);
										return null;
									}}
								>
									Play on Spotify
								</button>
								<br />
								<br />
								<button type="button" onClick={handleNextRecommendation}>
									New reco
								</button>
								<br />
								<br />
								{isLiked !== null && (
									<button type="button" onClick={() => handleLikeTrack(track.id)} aria-label={"Liked current music"}>
										<HeartSvg isLiked={isLiked} />
									</button>
								)}
							</div>
						</div>

						<div>
							<DoubleArrowSvg />
						</div>

						<div className="track_section justify_end">
							{tracksReco === null ? (
								<ErrorOrLoader error={errorFechingRecommendedTracks} minHeight="0vh" />
							) : (
								<>
									<div>
										<Artwork
											images={tracksReco[indexReco].album.images}
											alt={tracksReco[indexReco].name}
											size={"300px"}
											//isRounded
										/>
									</div>
									<div>
										<h1>{tracksReco[indexReco].name}</h1>
										<h2>{tracksReco[indexReco].artists[0].name}</h2>
										<p>
											{tracksReco[indexReco].album.name} in {tracksReco[indexReco].album.release_date}
										</p>
										<button
											type="button"
											onClick={() => {
												window.open(tracksReco[indexReco].external_urls.spotify);
												return null;
											}}
										>
											Play on Spotify
										</button>
										<br />
										<br />
										<button
											type="button"
											onClick={() => handleLikeRecoTrack(tracksReco[indexReco].id)}
											aria-label={"Liked recommended music"}
										>
											<HeartSvg isLiked={recoIsLiked} />
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				</SectionWrapper>
			</div>
		</Layout>
	);
};

export default Track;
