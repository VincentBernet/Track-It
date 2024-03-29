import axios from "axios";
import { accessToken } from "./auth";

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

/**
 * Get current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile
 */
export const getCurrentUserProfile = () => axios.get("/me");

/**
 * Get a User's Top Artists and Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopArtists = (time_range = "short_term") => {
	return axios.get(`/me/top/artists?time_range=${time_range}`);
};

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopTracks = (time_range = "short_term") => {
	return axios.get(`/me/top/tracks?time_range=${time_range}`);
};

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit = 10) => {
	return axios.get(`/me/playlists?limit=${limit}`);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = (playlist_id: string) => {
	return axios.get(`/playlists/${playlist_id}`);
};

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-several-audio-features
 * @param {string} ids - A comma-separated list of the Spotify IDs for the tracks
 * @returns {Promise}
 */
export const getAudioFeaturesForTracks = (ids: string) => {
	return axios.get(`/audio-features?ids=${ids}`);
};

/**
 * Get user's saved tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
 * @param {number} limit - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @returns {Promise}
 */
export const getCurrentUserSavedTracks = (limit = 50) => {
	return axios.get(`me/tracks?limit=${limit}`);
};

/**
 * Add one or more items to a user's playlist.
 * @param playlist_id
 * @param uris
 * @returns
 */
export const postAddTracksToPlaylist = (playlist_id: string, uris: string[]) => {
	return axios.post(`/playlists/${playlist_id}/tracks?uris=${uris.join(",")}`);
};

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 * @param {string} track_id - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getTrackById = (track_id: string) => {
	return axios.get(`/tracks/${track_id}`);
};

/**
 * Get a recommendation, based on seed artists, tracks and genres.
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 * @param {string} tracksId - The Spotify ID for the track.
 * @param {string} artistsId - The Spotify ID for the track.
 * @param {string} genres - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getRecommendations = ({
	tracksId,
	artistsId,
	genres,
}: { tracksId?: string[]; artistsId?: string[]; genres?: string[] }) => {
	if (!tracksId && !artistsId && !genres) {
		throw new Error("At least one of tracksId, artistsId or genres must be provided");
	}
	let params = "";
	if (tracksId) {
		params += `seed_tracks=${tracksId.join(",")}`;
	}
	if (artistsId) {
		params += `seed_artists=${artistsId.join(",")}`;
	}
	if (genres) {
		params += `seed_genres=${genres.join(",")}`;
	}
	return axios.get(`/recommendations?${params}`);
};

/**
 * Post a new playlist
 * https://developer.spotify.com/documentation/web-api/reference/create-playlist
 * @param {string} user_id - The userID for the new playlist.
 * @param {string} name - The name for the new playlist.
 * @param {string} description - The description for the new playlist.
 * @returns {Promise}
 */
type postNewPlaylistParams = {
	user_id: string;
	playlist_name: string;
	playlist_description: string;
};
export const postNewPlaylist = ({ user_id, playlist_name, playlist_description }: postNewPlaylistParams) => {
	return axios.post(`/users/${user_id}/playlists`, {
		name: playlist_name,
		description: playlist_description,
	});
};

/**
 * Put / add one or multiples tracks to your liked tracks
 * https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
 * @param {string[]} tracks_id - List of Spotify tracks IDs
 * @returns {Promise}
 */
export const addToLikedTracks = (tracks_id: string[]) => {
	return axios.put(`/me/tracks?ids=${tracks_id.join(",")}`);
};

/**
 * Delete / remove one or multiples tracks from your liked tracks
 * https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
 * @param {string[]} tracks_id - List of Spotify tracks IDs
 * @returns {Promise}
 */
export const removeFromLikedTracks = (tracks_id: string[]) => {
	return axios.delete(`/me/tracks?ids=${tracks_id.join(",")}`);
};

/**
 * Get if a track is saved in the current user's library
 * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
 * @param {string[]} tracks_id - List of Spotify tracks IDs
 * @returns {Promise}
 */
export const checkIfTrackIsSaved = (tracks_id: string[]) => {
	return axios.get(`/me/tracks/contains?ids=${tracks_id.join(",")}`);
};
