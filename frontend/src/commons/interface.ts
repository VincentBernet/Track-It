export interface localStorageKeysType {
    [key: string]: string,
    accessToken: string,
    refreshToken: string,
    expireTime: string,
    timestamp: string,
}

export interface localStorageValuesType {
    [key: string]: string | undefined,
    accessToken?: string,
    refreshToken?: string,
    expireTime?: string,
    timestamp?: string,
}