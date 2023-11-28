import { playlist, track } from "./responsesTypes";

const PlaylistsMock: playlist[] = [
    {
        id: "1",
        name: "Playlist 1",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "2",
        name: "Playlist 2",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "3",
        name: "Playlist 3",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "4",
        name: "Playlist 4",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "5",
        name: "Playlist 5",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "6",
        name: "Playlist 6",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "7",
        name: "Playlist 7",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "8",
        name: "Playlist 8",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "9",
        name: "Playlist 9",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
    {
        id: "10",
        name: "Playlist 10",
        images: [],
        artists: [],
        duration_ms: 0,
        followers: { href: "", total: 0 },
        tracks: { total: 0 },
    },
];

const TracksMock: track[] = [
    {
        album: {
            album_type: "album",
            total_tracks: 12,
            available_markets: ["US", "CA", "UK"],
            external_urls: {
                spotify: "https://example.com/album1",
            },
            href: "https://api.spotify.com/v1/albums/album1",
            id: "album1",
            images: [],
            name: "Album 1",
            release_date: "2023-01-01",
            release_date_precision: "day",
            restrictions: {
                reason: "Some reason",
            },
            type: "album",
            uri: "spotify:album:album1",
            artists: [
                {
                    name: "Artist 1",
                    images: [],
                    external_urls: {
                        spotify: "https://example.com/artist1",
                    },
                    followers: {
                        href: "https://example.com/followers1",
                        total: 10000,
                    },
                    genres: ["pop", "rock"],
                    href: "https://api.spotify.com/v1/artists/artist1",
                    popularity: 80,
                    id: "artist1",
                    type: "artist",
                    uri: "spotify:artist:artist1",
                },
            ],
        },
        artists: [],
        disc_number: 1,
        duration_ms: 240000,
        explicit: false,
        external_urls: {
            spotify: "https://example.com/track1",
        },
        href: "https://api.spotify.com/v1/tracks/track1",
        id: "track1",
        is_playable: false,
        restrictions: {
            reason: "Some reason",
        },
        name: "Track 1",
        popularity: 75,
        preview_url: "https://example.com/track1/preview",
        track_number: 1,
        type: "track",
        uri: "spotify:track:track1",
        is_local: false,
        audio_features: {
            acousticness: "0.5",
            analysis_url: "https://example.com/analysis1",
            danceability: "0.8",
            duration_ms: "240000",
            energy: "0.7",
            id: "audio1",
            instrumentalness: "0.2",
            liveness: "0.3",
            loudness: "-6.5",
            mode: "1",
            speechiness: "0.05",
            tempo: "120",
            time_signature: "4/4",
            track_href: "https://example.com/track1/audio",
            type: "audio_features",
            uri: "spotify:audio_features:audio1",
            valence: "0.9",
        },
    },
    {
        album: {
            album_type: "album",
            total_tracks: 15,
            available_markets: ["US", "CA", "UK"],
            external_urls: {
                spotify: "https://example.com/album2",
            },
            href: "https://api.spotify.com/v1/albums/album2",
            id: "album2",
            images: [],
            name: "Album 2",
            release_date: "2023-02-01",
            release_date_precision: "day",
            restrictions: {
                reason: "Some reason",
            },
            type: "album",
            uri: "spotify:album:album2",
            artists: [
                {
                    name: "Artist 1",
                    images: [],
                    external_urls: {
                        spotify: "https://example.com/artist1",
                    },
                    followers: {
                        href: "https://example.com/followers1",
                        total: 10000,
                    },
                    genres: ["pop", "rock"],
                    href: "https://api.spotify.com/v1/artists/artist1",
                    popularity: 80,
                    id: "artist1",
                    type: "artist",
                    uri: "spotify:artist:artist1",
                },
            ],
        },
        artists: [],
        disc_number: 1,
        duration_ms: 200000,
        explicit: false,
        external_urls: {
            spotify: "https://example.com/track2",
        },
        href: "https://api.spotify.com/v1/tracks/track2",
        id: "track2",
        is_playable: false,
        restrictions: {
            reason: "Some reason",
        },
        name: "Track 2",
        popularity: 80,
        preview_url: "https://example.com/track2/preview",
        track_number: 1,
        type: "track",
        uri: "spotify:track:track2",
        is_local: false,
        audio_features: {
            acousticness: "0.3",
            analysis_url: "https://example.com/analysis2",
            danceability: "0.7",
            duration_ms: "200000",
            energy: "0.8",
            id: "audio2",
            instrumentalness: "0.1",
            liveness: "0.4",
            loudness: "-5.5",
            mode: "0",
            speechiness: "0.08",
            tempo: "130",
            time_signature: "4/4",
            track_href: "https://example.com/track2/audio",
            type: "audio_features",
            uri: "spotify:audio_features:audio2",
            valence: "0.85",
        },
    },
    // Repeat the structure for 8 more entries
];

const responsesMock = {
    PlaylistsMock,
    TracksMock,
};

export default responsesMock;