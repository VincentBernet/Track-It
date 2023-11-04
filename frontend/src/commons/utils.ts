/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 
export const catchErrors = (fn: Promise<void>) => {
    return function (...args: any) {
        return fn(...args).catch((err: any) => {
            console.error(err);
        })
    }
}*/