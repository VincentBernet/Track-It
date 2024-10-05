import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	EasyModificationHeader,
	Layout,
	Notification,
	PlaylistList,
	TemporaryComponent,
	TrackCardList,
} from "../../../commons/components";
import { getCurrentUserProfile, postAddTracksToPlaylist } from "../../../commons/spotify/requests";
import type { ProfileData } from "../../../commons/spotify/responsesTypes";
import { type Playlist, getWordingButtonTracksToPlaylists } from "./EasyModificationUtils";

const EasyModification = () => {
	/* Get Profile : For Fetching profile */
	const [profile, setProfile] = useState<ProfileData | null>(null);

	/* Selected Playlist(s) state : For sending list IDs of selected playlists */
	const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>([]);

	/* Selected Track(s) state : For sending list Uri of selected tracks */
	const [selectedTracksUris, setSelectedTracksUris] = useState<string[]>([]);

	/* Post status : For displaying success/error messages after adding tracks to playlists or creating new playlist */
	const [playlistAdditionSuccess, setPlaylistAdditionSuccess] = useState<string[]>([]);
	const [playlistAdditionFailure, setPlaylistAdditionFailure] = useState<string[]>([]);

	/* Selected Playlist(s) state : For sending list IDs of selected playlists */
	const [visiblePlaylist, setVisiblePlaylist] = useState<Playlist>({ id: "", name: "likedTrack" });

	/* ------------------------------------------------------------------------------------------------------------- */
	/* Fetch profile on first render */
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userProfile = await getCurrentUserProfile();
				setProfile(userProfile.data);
			} catch (e) {
				setProfile(null);
			}
		};
		fetchData();
	}, []);

	const handleSelectedPlaylist = ({ id, name }: Playlist) => {
		if (selectedPlaylists.some((playlist) => playlist.id === id)) {
			setSelectedPlaylists(selectedPlaylists.filter((playlist) => playlist.id !== id));
		} else {
			setSelectedPlaylists([...selectedPlaylists, { id: id, name: name }]);
		}
	};

	const handleVisiblePlaylist = ({ id, name }: Playlist) => {
		setSelectedTracksUris([]);
		setVisiblePlaylist({ id: id, name: name });
	};

	const handleOnDelete = () => setPlaylistAdditionSuccess([]);

	const handleSelectedTracks = (uri: string) => {
		if (selectedTracksUris.includes(uri)) {
			setSelectedTracksUris(selectedTracksUris.filter((trackUri) => trackUri !== uri));
		} else {
			setSelectedTracksUris([...selectedTracksUris, uri]);
		}
	};

	const handleAddTracksToPlaylists = async () => {
		resetAllState();
		const playlistAdditionSuccessTemp: string[] = [];
		const playlistAdditionFailureTemp: string[] = [];
		for (const playlist of selectedPlaylists) {
			try {
				await postAddTracksToPlaylist(playlist.id, selectedTracksUris);
				playlistAdditionSuccessTemp.push(playlist.id);
			} catch {
				playlistAdditionFailureTemp.push(playlist.name);
			}
		}
		setPlaylistAdditionSuccess(playlistAdditionSuccessTemp);
		setPlaylistAdditionFailure(playlistAdditionFailureTemp);
	};

	const resetSelectedItems = () => {
		setSelectedPlaylists([]);
		setSelectedTracksUris([]);
	};

	const resetAllState = () => {
		resetSelectedItems();
		setPlaylistAdditionSuccess([]);
		setPlaylistAdditionFailure([]);
	};

	return (
		<>
			<Layout
				extraHeader={<EasyModificationHeader profile={profile} />}
				bodyColor={"#000000"}
				fixedMainPadding="32px 32px 32px 32px"
			>
				<div
					style={{
						marginBottom: "10px",
						display: "flex",
						gap: "30px",
						alignItems: "center",
						padding: "15px 15px 15px 15px",
						background: "var(--new-light-grey)",
						borderRadius: "15px",
					}}
				>
					<button
						type="button"
						onClick={handleAddTracksToPlaylists}
						disabled={selectedTracksUris.length < 1 || selectedPlaylists.length < 1}
					>
						{getWordingButtonTracksToPlaylists(selectedTracksUris.length, selectedPlaylists.length)}
					</button>
				</div>
				<div>
					<aside>
						<div
							style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
						>
							<h3>Your Playlists</h3>
							<Link className="secondary-text" to="/playlists">
								See all
							</Link>
						</div>
						<PlaylistList
							profile={profile}
							playlistAdditionSuccess={playlistAdditionSuccess}
							selectedPlaylists={selectedPlaylists}
							handleVisiblePlaylist={handleVisiblePlaylist}
							handleOnDelete={handleOnDelete}
							handleSelected={handleSelectedPlaylist}
						/>
					</aside>
					<section>
						<TrackCardList
							selectedTracksUris={selectedTracksUris}
							visiblePlaylist={visiblePlaylist}
							handleSelectedTracks={handleSelectedTracks}
						/>
					</section>
				</div>
			</Layout>

			{playlistAdditionFailure.length > 0 && (
				<TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
					<Notification
						status={"error"}
						message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`}
					/>
				</TemporaryComponent>
			)}
			{playlistAdditionFailure.length > 0 && (
				<TemporaryComponent handleOnDelete={() => setPlaylistAdditionFailure([])}>
					<Notification
						status={"error"}
						message={`These playlists could not be updated : ${playlistAdditionFailure.join(", ")} please try again.`}
					/>
				</TemporaryComponent>
			)}
		</>
	);
};

export default EasyModification;
