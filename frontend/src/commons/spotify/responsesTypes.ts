export type imageType = {
	url: string;
	height: number;
	width: number;
};

export type followersType = {
	href: string;
	total: number;
};

export type external_urlsType = {
	spotify: string;
};

export type artistType = {
	name: string;
	images: imageType[];
	external_urls: external_urlsType;
	followers: followersType;
	genres: string[];
	href: string;
	id: string;
	popularity: number;
	type: string;
	uri: string;
};

export type trackType = {
	album: {
		album_type: string;
		total_tracks: number;
		available_markets: string[];
		external_urls: external_urlsType;
		href: string;
		id: string;
		images: imageType[];
		name: string;
		release_date: string;
		release_date_precision: string;
		restrictions: {
			reason: string;
		};
		type: string;
		uri: string;
		artists: artistType[];
	};
	artists: artistType[];
	disc_number: number;
	duration_ms: number;
	explicit: false;
	external_urls: external_urlsType;
	href: string;
	id: string;
	is_playable: false;
	restrictions: {
		reason: string;
	};
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: false;
	audio_features?: audioFeaturesType;
};

export type playlistType = {
	id: string;
	images: imageType[];
	name: string;
	artists: artistType[];
	duration_ms: number;
	followers: followersType;
	tracks: {
		total: number;
	};
	selected?: boolean;
};

export interface playlistWithSelectedType extends playlistType {
	selected: boolean;
}

export type profileDataType = {
	display_name: string;
	external_urls: external_urlsType;
	href: string;
	id: string;
	images: imageType[];
	type: string;
	uri: string;
	followers: followersType;
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
};

export type topArtistsDataType = {
	items: artistType[];
};

export type topTracksDataType = {
	items: trackType[];
};

export type playlistTrackType = {
	track: trackType;
	added_at: string;
	is_local: boolean;
	primary_color: string;
	video_thumbnail: {
		url: string;
	};
};

export type playlistTracksDataType = {
	items: playlistTrackType[];
	total: number;
	offset: number;
	next: string;
	limit: number;
};

export type playlistsDataType = {
	items: playlistType[];
	total: number;
	offset: number;
	next: string;
	limit: number;
};

export type audioFeaturesType = {
	[key: string]: string;
	acousticness: string;
	analysis_url: string;
	danceability: string;
	duration_ms: string;
	energy: string;
	id: string;
	instrumentalness: string;
	liveness: string;
	loudness: string;
	mode: string;
	speechiness: string;
	tempo: string;
	time_signature: string;
	track_href: string;
	type: string;
	uri: string;
	valence: string;
};

export type audioFeaturesDataType = {
	audio_features: audioFeaturesType[];
};

export interface trackWithAudioFeaturesType extends trackType {
	audioFeatures: audioFeaturesType;
}

export type tracksDataItemType = {
	added_at: string;
	track: trackType;
};

export type tracksDataType = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: tracksDataItemType[];
};

export type tracksEnrichedDataType = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: tracksEnrichedDataItemType[];
};

export type tracksEnrichedDataItemType = {
	added_at: string;
	track: trackWithLikedType;
};

export type trackWithLikedType = trackType & {
	isSaved: boolean;
};

export type recommendationsType = {
	seeds: {
		afterFilteringSize: number;
		afterRelinkingSize: number;
		href: string;
		id: string;
		initialPoolSize: number;
		type: string;
	}[];
	tracks: trackType[];
};
