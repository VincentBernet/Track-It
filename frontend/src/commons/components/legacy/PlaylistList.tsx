import axios from "axios";
import { useEffect, useState } from "react";
import type { playlistType as handlePlaylistType } from "../../../features/pages/easy-modification/EasyModificationUtils";
import { getCurrentUserPlaylists, postNewPlaylist } from "../../spotify/requests";
import type { playlistType, playlistsDataType, profileDataType } from "../../spotify/responsesTypes";
import { StyledListReset } from "../../styles";
import { ErrorOrLoader, LikeSongCard, Modal, Notification, PlaylistCard, TemporaryComponent } from "../index";

type PlaylistListProps = {
	profile: profileDataType | null;
	selectedPlaylists: { id: string; name: string }[];
	playlistAdditionSuccess: string[];
	handleSelected: ({ id, name }: handlePlaylistType) => void;
	handleVisiblePlaylist: ({ id, name }: handlePlaylistType) => void;
	handleOnDelete: () => void;
};

const PlaylistList = ({
	profile,
	selectedPlaylists,
	playlistAdditionSuccess,
	handleSelected,
	handleVisiblePlaylist,
	handleOnDelete,
}: PlaylistListProps) => {
	/* Get Playlist : For Fetching playlists */
	const [playlistsData, setPlaylistsData] = useState<playlistsDataType | null>(null);
	const [playlists, setPlaylists] = useState<playlistType[] | null>(null);
	const [errorFetchingPlaylists, setErrorFetchingPlaylists] = useState<string | null>(null);

	/* Open modal creation new playlist */
	const [isModalNewPlaylistOpened, setIsModalNewPlaylistOpened] = useState<boolean>(false);
	const [playlistCreationFailure, setPlaylistCreationFailure] = useState<boolean>(false);

	/* Fetch first playlists batch on first render */
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getCurrentUserPlaylists();
				setPlaylistsData(data);
			} catch (e) {
				setErrorFetchingPlaylists("Error fetching first playlists batch");
			}
		};
		fetchData();
	}, []);

	// When playlistsData updates, check if there are more playlists to fetch
	// then update the state variable
	useEffect(() => {
		if (!playlistsData) {
			return;
		}

		// Playlist endpoint only returns 20 playlists at a time, so we need to
		// make sure we get ALL playlists by fetching the next set of playlists
		const fetchMoreData = async () => {
			try {
				if (playlistsData.next) {
					const { data } = await axios.get(playlistsData.next);
					setPlaylistsData(data);
				}
			} catch (e) {
				setErrorFetchingPlaylists("Error fetching next playlists batch");
			}
		};

		// Use functional update to update playlists state variable
		// to avoid including playlists as a dependency for this hook
		// and creating an infinite loop
		setPlaylists((playlists) => [...(playlists ? playlists : []), ...playlistsData.items]);

		// Fetch next set of playlists as needed
		fetchMoreData();
	}, [playlistsData]);

	const handleCreateNewPlaylist = ({
		playlistName,
		playlistDescription,
	}: {
		playlistName: string;
		playlistDescription: string;
	}) => {
		const fetchData = async () => {
			try {
				const { data } = await postNewPlaylist({
					user_id: profile?.id || "",
					playlist_name: playlistName,
					playlist_description: playlistDescription,
				});
				setPlaylists([...(playlists ? playlists : []), data]);
			} catch (e) {
				setPlaylistCreationFailure(true);
			}
		};
		fetchData();
	};

	const handleOnClickNewPlaylist = () => {
		setIsModalNewPlaylistOpened(true);
	};

	const handleOnCloseModalNewPlaylist = () => {
		setIsModalNewPlaylistOpened(false);
	};

	if (playlists === null) {
		return <ErrorOrLoader error={errorFetchingPlaylists} />;
	}
	return (
		<>
			{playlists?.length ? (
				<StyledListReset>
					<LikeSongCard handleVisiblePlaylist={handleVisiblePlaylist} />
					{playlists.map((playlist) => (
						<PlaylistCard
							key={playlist.id}
							playlist={playlist}
							clickable
							isSelected={selectedPlaylists.some((playlistSelected) => playlistSelected.id === playlist.id)}
							displayNotification={playlistAdditionSuccess.includes(playlist.id)}
							handleOnDelete={handleOnDelete}
							handleSelected={handleSelected}
							handleVisiblePlaylist={handleVisiblePlaylist}
						/>
					))}
				</StyledListReset>
			) : (
				<p className="empty-notice">No Playlist available</p>
			)}
			{profile && playlists && (
				<button type="button" onClick={() => handleOnClickNewPlaylist()} style={{ marginTop: "15px" }}>
					New Playlist
				</button>
			)}

			{isModalNewPlaylistOpened && (
				<Modal onClose={handleOnCloseModalNewPlaylist} onValidate={handleCreateNewPlaylist} />
			)}

			{playlistCreationFailure && (
				<TemporaryComponent handleOnDelete={() => setPlaylistCreationFailure(false)}>
					<Notification status={"error"} message={`Your playlist couldn't be created, try again later`} />
				</TemporaryComponent>
			)}
		</>
	);
};

export default PlaylistList;
