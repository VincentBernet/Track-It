import axios from 'axios';
import { accessToken } from './auth';

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile
 */
export const getCurrentUserProfile = () => axios.get('/me');

/**
 * Get a User's Top Artists and Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopArtists = (time_range: string = 'short_term') => {
    return axios.get(`/me/top/artists?time_range=${time_range}`);
};

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopTracks = (time_range: string = 'short_term') => {
    return axios.get(`/me/top/tracks?time_range=${time_range}`);
};

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit: number = 10) => {
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
}

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
export const getCurrentUserSavedTracks = (limit: number = 50) => {
    return axios.get(`me/tracks?limits=${limit}`);
};

/**
 * Add one or more items to a user's playlist.
 * @param playlist_id 
 * @param uris 
 * @returns 
 */
export const postAddTracksToPlaylist = (playlist_id: string, uris: string[]) => {
    return axios.post(`/playlists/${playlist_id}/tracks?uris=${uris.join(',')}`);
};