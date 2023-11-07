interface image {
    url: string;
}

export interface artist {
    name: string;
    images: image[];
}

export interface track {
    album: {
        images: image[];
        name: string;
    };
    name: string;
    artists: artist[];
    duration_ms: number;
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

export interface complexeTrack {
    track: track;
    added_at: string;
    is_local: boolean;
    primary_color: string;
    video_thumbnail: {
        url: string;
    };
}

export interface tracksData {
    items: complexeTrack[];
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