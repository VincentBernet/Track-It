export type Image = {
	url: string;
	height: number;
	width: number;
};

export type Followers = {
	href: string;
	total: number;
};

export type ExternalUrls = {
	spotify: string;
};

export type Artist = {
	name: string;
	images: Image[];
	external_urls: ExternalUrls;
	followers: Followers;
	genres: string[];
	href: string;
	id: string;
	popularity: number;
	type: string;
	uri: string;
};

export type Track = {
	album: {
		album_type: string;
		total_tracks: number;
		available_markets: string[];
		external_urls: ExternalUrls;
		href: string;
		id: string;
		images: Image[];
		name: string;
		release_date: string;
		release_date_precision: string;
		restrictions: {
			reason: string;
		};
		type: string;
		uri: string;
		artists: Artist[];
	};
	artists: Artist[];
	disc_number: number;
	duration_ms: number;
	explicit: false;
	external_urls: ExternalUrls;
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
	audio_features?: AudioFeatures;
};

export type Playlist = {
	id: string;
	images: Image[];
	name: string;
	artists: Artist[];
	duration_ms: number;
	followers: Followers;
	tracks: {
		total: number;
	};
	selected?: boolean;
};

export type ProfileData = {
	display_name: string;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	type: string;
	uri: string;
	followers: Followers;
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
};

export type TopArtistsData = {
	items: Artist[];
};

export type TopTracksData = {
	items: Track[];
};

export type PlaylistTrack = {
	track: Track;
	added_at: string;
	is_local: boolean;
	primary_color: string;
	video_thumbnail: {
		url: string;
	};
};

export type PlaylistTracksData = {
	items: PlaylistTrack[];
	total: number;
	offset: number;
	next: string;
	limit: number;
};

export type PlaylistsData = {
	items: Playlist[];
	total: number;
	offset: number;
	next: string;
	limit: number;
};

export type AudioFeatures = {
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

export type TracksDataItem = {
	added_at: string;
	track: Track;
};

export type TracksData = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: TracksDataItem[];
};

export type TracksEnrichedData = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: TracksEnrichedDataItem[];
};

export type TracksEnrichedDataItem = {
	added_at: string;
	track: TrackWithLiked;
};

export type TrackWithLiked = Track & {
	isSaved: boolean;
};
