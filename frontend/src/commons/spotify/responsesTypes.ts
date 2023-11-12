interface image {
    url: string;
}

export interface artist {
    name: string;
    images: image[];
}

export interface track {
    id: string;
    album: {
        images: image[];
        name: string;
    };
    name: string;
    artists: artist[];
    duration_ms: number;
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
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}

export interface audioFeaturesData {
    audio_features: audioFeatures[];
}

export interface trackWithAudioFeatures extends track {
    audioFeatures: audioFeatures;
}