export type localStorageKeysType = {
	[key: string]: string;
	accessToken: string;
	refreshToken: string;
	expireTime: string;
	timestamp: string;
};

export type localStorageValuesType = {
	[key: string]: string | undefined;
	accessToken?: string;
	refreshToken?: string;
	expireTime?: string;
	timestamp?: string;
};
