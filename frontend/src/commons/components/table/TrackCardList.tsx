import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getArtistsName, type playlistType } from "../../../features/pages/easy-modification/EasyModificationUtils";
import {
	addToLikedTracks,
	checkIfTrackIsSaved,
	getCurrentUserSavedTracks,
	getPlaylistById,
	removeFromLikedTracks,
} from "../../spotify/requests";
import type {
	tracksDataItemType,
	tracksDataType,
	tracksEnrichedDataItemType,
	tracksEnrichedDataType,
} from "../../spotify/responsesTypes";
import { formatDateAdded } from "../../utils";
import { ErrorOrLoader, PropertiesDropdown, SearchFilter, SortDropdown, TableHeader } from "../index";
import TrackCard from "./TrackCard";
import { type columnNames, initialSortByOptionValue, type tableOptionsType } from "./Utils";

type TrackCardListProps = {
	selectedTracksUris: string[];
	visiblePlaylist: playlistType;
	handleSelectedTracks: (id: string) => void;
};

const TrackCardList = ({ selectedTracksUris, visiblePlaylist, handleSelectedTracks }: TrackCardListProps) => {
	/* Get Tracks : For Fetching tracks */
	const [tracksData, setTracksData] = useState<tracksEnrichedDataType | null>(null);
	const [tracks, setTracks] = useState<tracksEnrichedDataItemType[] | null>(null);
	const [successFetchingTracks, setSuccessFetchingTracks] = useState<boolean | null>(null);
	const [errorFetchingTracks, setErrorFetchingTracks] = useState<string | null>(null);
	const [title, setTitle] = useState<string>("Liked Songs");

	// TableOptions for sorting tracks and display / hiding columns state
	const [tableOptions, setTableOptions] = useState<tableOptionsType>(initialSortByOptionValue);
	const [displayMode, setDisplayMode] = useState<"list" | "compact">(
		(localStorage.getItem("displayMode") as "list" | "compact") || "list",
	);

	// Filtering state
	const [searchFilter, setSearchFilter] = useState<string>("");

	const handleReInitializationState = ({ title }: { title: string }) => {
		setTracks(null);
		setSuccessFetchingTracks(false);
		setTitle(title);
		setSearchFilter("");
	};

	const fetchDataIsSaved = async (firstData: tracksDataType) => {
		try {
			const likedTracksIds = firstData.items.map((track: tracksDataItemType) => track.track.id);

			let fullResponse: string[] = [];
			// Spotify API only allows to check 50 tracks at a time
			for (let i = 0; i < likedTracksIds.length; i += 50) {
				const { data } = await checkIfTrackIsSaved(likedTracksIds.slice(i, i + 50));
				fullResponse = [...fullResponse, ...data];
			}

			const dataItemsWithLiked: tracksEnrichedDataItemType[] = firstData.items.map(
				(currTrack: tracksDataItemType, i) => {
					return {
						added_at: currTrack.added_at,
						track: {
							...currTrack.track,
							isSaved: fullResponse[i] ? true : false,
						},
					};
				},
			);
			const dataWithLiked = {
				items: dataItemsWithLiked,
				href: firstData.href,
				limit: firstData.limit,
				next: firstData.next,
				offset: firstData.offset,
				previous: firstData.previous,
				total: firstData.total,
			};
			setTracksData(dataWithLiked);
		} catch {
			setErrorFetchingTracks("Error while fetching liked tracks");
		}
	};

	// Fetch tracks on first render
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (visiblePlaylist.name === "likedTrack") {
					const { data } = await getCurrentUserSavedTracks();
					handleReInitializationState({ title: "Liked Songs" });
					fetchDataIsSaved(data);
				} else {
					const { data } = await getPlaylistById(visiblePlaylist.id);
					console.debug("Playlist tracks:", data.tracks);
					handleReInitializationState({ title: visiblePlaylist.name });
					fetchDataIsSaved(data.tracks);
				}
			} catch {
				console.error("Error while fetching first tracks batch");
				setErrorFetchingTracks("Error while fetching first tracks batch");
			}
		};
		console.debug("First useEffect");
		fetchData();
	}, [visiblePlaylist]);

	// X useEffect to fetch more data
	useEffect(() => {
		if (!tracksData) {
			return;
		}
		console.debug("X useEffect to fetch more data ");

		// Tracks endpoint only returns 50 tracks at a time, so we need to
		// make sure we get ALL tracks by fetching the next set of tracks
		const fetchMoreData = async () => {
			if (tracksData.next) {
				try {
					const { data } = await axios.get(tracksData.next);
					fetchDataIsSaved(data);
				} catch {
					setErrorFetchingTracks("Error while fetching more tracks");
				}
			} else {
				setErrorFetchingTracks(null);
				setSuccessFetchingTracks(true);
			}
		};

		// Use functional update to update tracks state variable
		// to avoid including tracks as a dependency for this hook
		// and creating an infinite loop
		setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);

		// Fetch next set of tracks as needed
		fetchMoreData();
	}, [tracksData]);

	const handleDisplayMode = (mode: "list" | "compact") => {
		localStorage.setItem("displayMode", mode);
		setDisplayMode(mode);
	};

	const handleLikedButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, trackId: string) => {
		if (tracks === null) return null;
		removeFromLikedTracks([trackId]);
		const newTracks = [...tracks];
		const trackIndex = newTracks.findIndex((track) => track.track.id === trackId);
		const isLiked = newTracks[trackIndex].track.isSaved;
		newTracks[trackIndex].track.isSaved = !isLiked;
		e.stopPropagation();
		if (isLiked) {
			try {
				await removeFromLikedTracks([trackId]);
				setTracks(newTracks);
			} catch {
				alert("Error while removing track from liked tracks");
			}
		} else {
			try {
				await addToLikedTracks([trackId]);
				setTracks(newTracks);
			} catch {
				alert("Error while add track from liked tracks");
			}
		}
	};

	// Sort tracks by audio features
	const sortedTracks = useMemo(() => {
		if (!tracks) {
			return null;
		}

		if (!successFetchingTracks) {
			return null;
		}

		const sortedTracks = [...tracks];

		if (tableOptions.date_added.isAscending !== undefined) {
			if (tableOptions.date_added.isAscending === true) {
				return sortedTracks.sort((a, b) => b.added_at.localeCompare(a.added_at));
			}
			return sortedTracks.sort((a, b) => a.added_at.localeCompare(b.added_at));
		}

		if (tableOptions.name.isAscending !== undefined) {
			if (tableOptions.name.isAscending === true) {
				return sortedTracks.sort((a, b) => a.track.name.localeCompare(b.track.name));
			}
			return sortedTracks.sort((a, b) => b.track.name.localeCompare(a.track.name));
		}

		if (tableOptions.artist.isAscending !== undefined) {
			if (tableOptions.artist.isAscending === true) {
				return sortedTracks.sort((a, b) =>
					getArtistsName(a.track.artists).localeCompare(getArtistsName(b.track.artists)),
				);
			}
			return sortedTracks.sort((a, b) => b.track.artists[0].name.localeCompare(a.track.artists[0].name));
		}

		if (tableOptions.album.isAscending !== undefined) {
			if (tableOptions.album.isAscending === true) {
				return sortedTracks.sort((a, b) => a.track.album.name.localeCompare(b.track.album.name));
			}
			return sortedTracks.sort((a, b) => b.track.album.name.localeCompare(a.track.album.name));
		}

		if (tableOptions.duration.isAscending !== undefined) {
			if (tableOptions.duration.isAscending === true) {
				return sortedTracks.sort((a, b) => a.track.duration_ms - b.track.duration_ms);
			}
			return sortedTracks.sort((a, b) => b.track.duration_ms - a.track.duration_ms);
		}

		return sortedTracks;
	}, [tableOptions, successFetchingTracks, tracks]);

	const filteredAndSortedTracks = useMemo(() => {
		if (!sortedTracks) {
			return null;
		}

		if (searchFilter === "") {
			return sortedTracks;
		}

		return sortedTracks.filter(
			(track) =>
				track.track.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
				track.track.album.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
				track.track.artists[0].name.toLowerCase().includes(searchFilter.toLowerCase()),
		);
	}, [searchFilter, sortedTracks]);

	if (filteredAndSortedTracks === null || errorFetchingTracks) {
		return <ErrorOrLoader error={errorFetchingTracks} />;
	}

	const handleSort = (selectedColumnName: columnNames) => {
		const newTableOption: tableOptionsType = {
			date_added: {
				isAscending: undefined,
				label: "Date added",
				isDisplayed: tableOptions.date_added.isDisplayed,
			},
			name: {
				isAscending: undefined,
				label: "Name",
				isDisplayed: tableOptions.name.isDisplayed,
			},
			artist: {
				isAscending: undefined,
				label: "Artist",
				isDisplayed: tableOptions.artist.isDisplayed,
			},
			album: {
				isAscending: undefined,
				label: "Album",
				isDisplayed: tableOptions.album.isDisplayed,
			},
			duration: {
				isAscending: undefined,
				label: "Duration",
				isDisplayed: tableOptions.duration.isDisplayed,
			},
		};
		if (tableOptions[selectedColumnName].isAscending === undefined) {
			newTableOption[selectedColumnName].isAscending = true;
			setTableOptions(newTableOption);
			return;
		}
		newTableOption[selectedColumnName].isAscending = !tableOptions[selectedColumnName].isAscending;
		setTableOptions(newTableOption);
		return;
	};

	const handleDisplay = (selectedColumnName: columnNames) => {
		const temporaryTableOptions: tableOptionsType = { ...tableOptions };
		temporaryTableOptions[selectedColumnName].isDisplayed = !tableOptions[selectedColumnName].isDisplayed;
		setTableOptions(temporaryTableOptions);
	};

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
				<h3>{`${title} : ${filteredAndSortedTracks.length} tracks`}</h3>
				<div style={{ display: "flex", justifyContent: "end", gap: "10px", alignItems: "center" }}>
					<SortDropdown tableOptions={tableOptions} handleSort={handleSort} />
					<SearchFilter onChange={(inputValue) => setSearchFilter(inputValue)} />
					<PropertiesDropdown
						tableOptions={tableOptions}
						displayMode={displayMode}
						handleDisplayMode={handleDisplayMode}
						handleDisplay={handleDisplay}
					/>
				</div>
			</div>
			{filteredAndSortedTracks?.length ? (
				<StyledTable>
					<TableHeader tableOptions={tableOptions} displayMode={displayMode} handleSort={handleSort} />
					<tbody>
						{filteredAndSortedTracks.map(({ track, added_at }, i) => (
							<TrackCard
								tableOptions={tableOptions}
								displayMode={displayMode}
								track={track}
								searchFilter={searchFilter}
								addedAt={formatDateAdded(added_at)}
								key={track.id + i}
								index={i}
								clickable
								isSelected={selectedTracksUris.includes(track.uri)}
								handleSelectedTracks={handleSelectedTracks}
								handleLikedButton={handleLikedButton}
							/>
						))}
					</tbody>
				</StyledTable>
			) : (
				<p className="empty-notice">No tracks available</p>
			)}
		</>
	);
};

export default TrackCardList;

const StyledTable = styled.table`
    th {
        cursor: pointer;
        text-align: left;
        padding: 0.5rem;
        border-bottom: 1px solid var(--dark-grey);
        &:hover {
            background-color: var(--dark-grey);
        }
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }
        .center {
            text-align: center;
        }
    }

    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 10px;
`;
