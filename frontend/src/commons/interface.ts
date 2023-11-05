export interface localStorageKeys {
    [key: string]: string,
    accessToken: string,
    refreshToken: string,
    expireTime: string,
    timestamp: string,
}

export interface localStorageValues {
    [key: string]: string | undefined,
    accessToken?: string,
    refreshToken?: string,
    expireTime?: string,
    timestamp?: string,
}