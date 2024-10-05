export type LocalStorageKeys = {
	[key: string]: string;
	accessToken: string;
	refreshToken: string;
	expireTime: string;
	timestamp: string;
};

export type LocalStorageValues = {
	[key: string]: string | undefined;
	accessToken?: string;
	refreshToken?: string;
	expireTime?: string;
	timestamp?: string;
};
