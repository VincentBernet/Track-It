interface image {
    url: string;
    height: number;
    width: number;
}

export interface artist {
    name: string;
    images: image[];

    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface track {
    album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
            spotify: string
        };
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
        artists: [
            {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }
        ]
    };
    artists: artist[];
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_urls: {
        spotify: string;
    };
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

export interface playlist {
    id: string;
    images: image[];
    name: string;
    artists: artist[];
    duration_ms: number;
    followers: {
        total: number;
    };
    tracks: {
        total: number;
    };
    selected?: boolean;
}

export interface PlaylistWithSelectedType extends playlist {
    selected: boolean;
}

export interface profileData {
    display_name: string;
    images: image[];
    followers: {
        total: number;
    };
}

export interface topArtistsData {
    items: artist[];
}


export interface topTracksData {
    items: track[];
}

export interface playlistTrack {
    track: track;
    added_at: string;
    is_local: boolean;
    primary_color: string;
    video_thumbnail: {
        url: string;
    };
}

export interface playlistTracksData {
    items: playlistTrack[];
    total: number;
    offset: number;
    next: string;
    limit: number;
}

export interface playlistsData {
    items: playlist[];
    total: number;
    offset: number;
    next: string;
    limit: number;
}

export interface audioFeatures {
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

export interface audioFeaturesData {
    audio_features: audioFeatures[];
}

export interface trackWithAudioFeatures extends track {
    audioFeatures: audioFeatures;
}

export interface tracksDataItem {
    added_at: string;
    track: track;
}

export interface tracksData {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: tracksDataItem[];
}