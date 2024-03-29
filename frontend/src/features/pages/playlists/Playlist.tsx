import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorOrLoader, Layout, SectionWrapper, TrackList } from "../../../commons/components";
import { getAudioFeaturesForTracks, getPlaylistById } from "../../../commons/spotify/requests";
import type {
	audioFeaturesType,
	playlistTrackType,
	playlistTracksDataType,
	playlistType,
} from "../../../commons/spotify/responsesTypes";
import { StyledDropdownOld, StyledHeader } from "../../../commons/styles";
import { catchErrors } from "../../../commons/utils";

const Playlist = () => {
	const { id } = useParams();
	const [playlist, setPlaylist] = useState<playlistType | null>(null);
	const [tracksData, setTracksData] = useState<playlistTracksDataType | null>(null);
	const [tracks, setTracks] = useState<playlistTrackType[] | null>(null);
	const [audioFeatures, setAudioFeatures] = useState<audioFeaturesType[] | null>(null);
	const [sortValue, setSortValue] = useState<string>("");

	const [errorFetchingPlaylist, setErrorFetchingPlaylist] = useState<string | null>(null);

	type sortOptionsType =
		| "danceability"
		| "tempo"
		| "energy"
		| "valence"
		| "acousticness"
		| "instrumentalness"
		| "liveness"
		| "speechiness"
		| "duration_ms"
		| "popularity";
	const sortOptions: sortOptionsType[] = [
		"danceability",
		"tempo",
		"energy",
		"valence",
		"acousticness",
		"instrumentalness",
		"liveness",
		"speechiness",
		"duration_ms",
		"popularity",
	];

	// Map over tracks and add audio_features property to each track
	const tracksWithAudioFeatures = useMemo(() => {
		if (!tracks || !audioFeatures) {
			return null;
		}

		return tracks.map(({ track }) => {
			const trackToAdd = track;

			if (!track.audio_features) {
				const audioFeaturesObj = audioFeatures.find((item) => {
					if (!item || !track) {
						return null;
					}
					return item.id === track.id;
				});

				trackToAdd.audio_features = audioFeaturesObj;
			}

			return trackToAdd;
		});
	}, [tracks, audioFeatures]);

	// Sort tracks by audio feature to be used in template
	const sortedTracks = useMemo(() => {
		if (!tracksWithAudioFeatures) {
			return null;
		}

		return [...tracksWithAudioFeatures].sort((a, b) => {
			const aFeatures = a.audio_features;
			const bFeatures = b.audio_features;

			if (!aFeatures || !bFeatures) {
				return 0;
			}

			return Number(bFeatures[sortValue]) - Number(aFeatures[sortValue]);
		});
	}, [sortValue, tracksWithAudioFeatures]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getPlaylistById(id || "");
				setPlaylist(data);
				setTracksData(data.tracks);
			} catch {
				setErrorFetchingPlaylist("Error fetching playlist. Please try again.");
			}
		};
		fetchData();
	}, [id]);

	// When tracksData updates, compile arrays of tracks and audioFeatures
	useEffect(() => {
		if (!tracksData) {
			return;
		}

		// When tracksData updates, check if there are more tracks to fetch
		// then update the state variable
		const fetchMoreData = async () => {
			if (tracksData.next) {
				const { data } = await axios.get(tracksData.next);
				setTracksData(data);
			}
		};

		setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);

		catchErrors(fetchMoreData());

		// Also update the audioFeatures state variable using the track IDs
		const fetchAudioFeatures = async () => {
			const ids = tracksData.items.map(({ track }) => track.id).join(",");
			const { data } = await getAudioFeaturesForTracks(ids);
			setAudioFeatures((audioFeatures) => [...(audioFeatures ? audioFeatures : []), ...data.audio_features]);
		};
		catchErrors(fetchAudioFeatures());
	}, [tracksData]);

	const links = [
		{ link: "", title: "Easy-Modification" },
		{ link: "playlists", title: "Playlists" },
	];

	if (!playlist) {
		return (
			<Layout>
				<ErrorOrLoader error={errorFetchingPlaylist} />
			</Layout>
		);
	}

	return (
		<Layout
			extraHeader={
				<StyledHeader>
					<div className="header__inner">
						{playlist.images?.length && playlist.images[0].url ? (
							<img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
						) : null}
						<div>
							<div className="header__overline">Playlist</div>
							<h1 className="header__name">{playlist.name}</h1>
							<p className="header__meta">
								{playlist.followers.total ? (
									<span>
										{playlist.followers.total} {`follower${playlist.followers.total > 1 ? "s" : ""}`}
									</span>
								) : null}
								<span>
									{playlist.tracks.total} {`song${playlist.tracks.total > 1 ? "s" : ""}`}
								</span>
							</p>
						</div>
					</div>
				</StyledHeader>
			}
		>
			<SectionWrapper
				title="Playlist"
				links={links}
				extra={
					<StyledDropdownOld $activeOption={!!sortValue}>
						<label className="sr-only" htmlFor="order-select">
							Sort tracks
						</label>
						<select name="track-order" id="order-select" onChange={(e) => setSortValue(e.target.value)}>
							<option value="">Sort tracks</option>
							{sortOptions.map((option) => (
								<option value={option} key={option}>
									{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}
								</option>
							))}
						</select>
					</StyledDropdownOld>
				}
			>
				{sortedTracks && <TrackList tracks={sortedTracks} />}
			</SectionWrapper>
		</Layout>
	);
};

export default Playlist;
