export type image = {
    url: string;
    height: number;
    width: number;
}

export type followers = {
    href: string;
    total: number;
};

export type external_urls = {
    spotify: string;
};

export type artist = {
    name: string;
    images: image[];
    external_urls: external_urls
    followers: followers;
    genres: string[];
    href: string;
    id: string;
    popularity: number;
    type: string;
    uri: string;
}

export type track = {
    album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: external_urls
        href: string;
        id: string;
        images: image[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions: {
            reason: string;
        };
        type: string;
        uri: string;
        artists: artist[];
    };
    artists: artist[];
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_urls: external_urls
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
    audio_features?: audioFeatures;
}

export type playlist = {
    id: string;
    images: image[];
    name: string;
    artists: artist[];
    duration_ms: number;
    followers: followers;
    tracks: {
        total: number;
    };
    selected?: boolean;
}

export interface PlaylistWithSelectedType extends playlist {
    selected: boolean;
}

export type profileData = {
    display_name: string;
    external_urls: external_urls
    href: string;
    id: string;
    images: image[];
    type: string;
    uri: string;
    followers: followers;
    country: string;
    product: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    email: string;
}

export type topArtistsData = {
    items: artist[];
}


export type topTracksData = {
    items: track[];
}

export type playlistTrack = {
    track: track;
    added_at: string;
    is_local: boolean;
    primary_color: string;
    video_thumbnail: {
        url: string;
    };
}

export type playlistTracksData = {
    items: playlistTrack[];
    total: number;
    offset: number;
    next: string;
    limit: number;
}

export type playlistsData = {
    items: playlist[];
    total: number;
    offset: number;
    next: string;
    limit: number;
}

export type audioFeatures = {
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
}

export type audioFeaturesData = {
    audio_features: audioFeatures[];
}

export interface trackWithAudioFeatures extends track {
    audioFeatures: audioFeatures;
}

export type tracksDataItem = {
    added_at: string;
    track: track;
}

export type tracksData = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: tracksDataItem[];
}

export type tracksEnrichedData = {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: tracksEnrichedDataItem[];
}

export type tracksEnrichedDataItem = {
    added_at: string;
    track: trackWithLiked;
}

export type trackWithLiked = track & {
    isSaved: boolean;
}

export type recommendations = {
    seeds: {
        afterFilteringSize: number;
        afterRelinkingSize: number;
        href: string;
        id: string;
        initialPoolSize: number;
        type: string;
    }[];
    tracks: track[];
}