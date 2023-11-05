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

export interface playlistsData {
    items: playlist[];
    total: number;
}