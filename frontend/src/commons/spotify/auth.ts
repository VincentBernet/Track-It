import axios from "axios";
import type { localStorageKeysType, localStorageValuesType } from "../type";

// Map for localStorage keys
const LOCALSTORAGE_KEYS: localStorageKeysType = {
	accessToken: "spotify_access_token",
	refreshToken: "spotify_refresh_token",
	expireTime: "spotify_token_expire_time",
	timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES: localStorageValuesType = {
	accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken) || undefined,
	refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken) || undefined,
	expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime) || undefined,
	timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp) || undefined,
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
	console.debug("logout");
	// Clear all localStorage items
	for (const property in LOCALSTORAGE_KEYS) {
		window.localStorage.removeItem(LOCALSTORAGE_KEYS[property] || "");
	}
	// Navigate to homepage
	window.location.href = window.location.origin;
};

export const logoutThenLogin = () => {
	console.debug("logoutThenLogin");
	// Clear all localStorage items
	for (const property in LOCALSTORAGE_KEYS) {
		window.localStorage.removeItem(LOCALSTORAGE_KEYS[property] || "");
	}
	window.location.href = LOGIN_URI;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
	const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
	console.debug("hasTokenExpired : accessToken", accessToken, ", timestamp", timestamp, ", expireTime", expireTime);

	if (!accessToken || !timestamp) {
		console.debug("hasTokenExpired : return false");
		return false;
	}
	const millisecondsElapsed = Date.now() - Number(timestamp);
	console.debug(
		"hasTokenExpired : millisecondsElapsed / 1000 > Number(expireTime) return",
		millisecondsElapsed / 1000 > Number(expireTime),
	);
	return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
	console.debug("RefreshToken");
	try {
		// Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
		if (
			!LOCALSTORAGE_VALUES.refreshToken ||
			LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
			Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
		) {
			console.error("No refresh token available");
			logout();
		}

		// Use `/refresh_token` endpoint from our Node app
		const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

		// Update localStorage values
		window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
		window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
		console.debug(
			"refreshToken : parameter refresh_token=${LOCALSTORAGE_VALUES.refreshToken}",
			LOCALSTORAGE_VALUES.refreshToken,
			"data.access_token",
			data.access_token,
			", Date.now()",
			Date.now().toString(),
		);

		if (data.access_token === undefined) {
			console.error("No access token available");
			return;
		}
		// Reload the page for localStorage updates to be reflected
		window.location.reload();
	} catch (e) {
		console.error(e);
	}
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const queryParams = {
		[LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
		[LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
		[LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
	};
	const hasError = urlParams.get("error");

	// If there's an error OR the token in localStorage has expired, refresh the token
	if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === "undefined") {
		console.debug(
			"getAccessToken about to enter refreshToken: hasError",
			hasError,
			", hasTokenExpired()",
			hasTokenExpired(),
			", LOCALSTORAGE_VALUES.accessToken",
			LOCALSTORAGE_VALUES.accessToken,
		);
		refreshToken();
	}

	// If there is a valid access token in localStorage, use that
	if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== "undefined") {
		console.debug(
			"getAccessToken has a valid access token in localStorage: hasError",
			hasError,
			", hasTokenExpired()",
			hasTokenExpired(),
			", LOCALSTORAGE_VALUES.accessToken",
			LOCALSTORAGE_VALUES.accessToken,
		);
		return LOCALSTORAGE_VALUES.accessToken;
	}

	// If there is a token in the URL query params, user is logging in for the first time
	if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
		// Store the query params in localStorage
		for (const property in queryParams) {
			window.localStorage.setItem(property, queryParams[property] || "");
		}
		// Set timestamp
		window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
		// Return access token from query params
		return queryParams[LOCALSTORAGE_KEYS.accessToken];
	}

	// We should never get there!
	return null;
};

export const LOGIN_URI =
	process.env.NODE_ENV !== "production"
		? "http://localhost:8888/login"
		: "https://track-it-spotify.herokuapp.com/login";

export const accessToken = getAccessToken();
