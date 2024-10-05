import type { artistType } from "../../../commons/spotify/responsesTypes";

export type playlistType = { id: string; name: string };

const getWordingButtonTracksToPlaylists = (selectedTracksLength: number, selectedPlaylistsLength: number) => {
	return selectedTracksLength === 0 && selectedPlaylistsLength === 0
		? "First select tracks and playlists below"
		: selectedPlaylistsLength === 0
			? "Then select the playlist where you want to add the tracks"
			: selectedTracksLength === 0
				? "Then select the tracks to be added"
				: selectedTracksLength === 1
					? `Add 1 track to ${selectedPlaylistsLength} playlist`
					: selectedPlaylistsLength === 1
						? `Add ${selectedTracksLength} tracks to 1 playlist`
						: `Add ${selectedTracksLength} tracks to ${selectedPlaylistsLength} playlists`;
};

const getArtistsName = (artists: artistType[]) => {
	return artists.reduce((acc, artist, i) => acc + artist.name + (i !== artists.length - 1 ? ", " : ""), "");
};

export { getWordingButtonTracksToPlaylists, getArtistsName };
