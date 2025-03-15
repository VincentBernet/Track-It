/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */

// biome-ignore lint/suspicious/noExplicitAny: Will need to find a way to type this correctly, and also to have a good hooks to catchErrors
export const catchErrors = (fn: any) => {
	// biome-ignore lint/suspicious/noExplicitAny: Will need to find a way to type this correctly, and also to have a good hooks to catchErrors
	return (...args: any) =>
		// biome-ignore lint/suspicious/noExplicitAny: Will need to find a way to type this correctly, and also to have a good hooks to catchErrors
		fn(...args).catch((err: any) => {
			console.error("On a une erreur chef:", err);
		});
};

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

/**
 * Format added_at (string) to inteligible date
 * @param {string} added_at number of milliseconds
 * @returns {string} inteleligible date
 * @example 2023-12-12T16:24:28Z -> '1 week ago'
 */
export const formatDateAdded = (addedAt: string) => {
	const date = new Date(addedAt);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (days === 0) {
		const hours = Math.floor(diff / (1000 * 60 * 60));
		if (hours === 0) {
			const minutes = Math.floor(diff / (1000 * 60));
			return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
		}
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	}
	if (days < 7) {
		return `${days + 1} days ago`;
	}
	if (days < 31) {
		const weeks = Math.floor(days / 7);
		return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
	}
	return `${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
};
