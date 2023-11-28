const getWordingButtonTracksToPlaylists = (selectedTracksLength: number, selectedPlaylistsLength: number) => {
    return (
        selectedTracksLength === 0 && selectedPlaylistsLength === 0 ?
            "First select tracks and playlists bellow" :
            selectedPlaylistsLength === 0 ?
                "Then select the playlist where you want to add the tracks" :
                selectedTracksLength === 0 ?
                    "Then select the tracks to be added" :
                    selectedTracksLength === 1 ?
                        `Add 1 track to ${selectedPlaylistsLength} playlist` :
                        selectedPlaylistsLength === 1 ?
                            `Add ${selectedTracksLength} tracks to 1 playlist` :
                            `Add ${selectedTracksLength} tracks to ${selectedPlaylistsLength} playlists`
    );
}

export default getWordingButtonTracksToPlaylists;