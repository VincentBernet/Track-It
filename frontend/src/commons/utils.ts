/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = (fn: any) => {
    return function (...args: any) {
        return fn(...args).catch((err: any) => {
            console.log("On a une erreur chef");
            console.error(err);
        })
    }
}

/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
export const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(((ms % 60000) / 1000));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}