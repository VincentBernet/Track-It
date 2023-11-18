import { PlaylistCard } from ".";
import { playlist } from "../spotify/responsesTypes";
import { StyledListReset } from "../styles";

interface PlaylistListProps {
    playlists: playlist[];
    selectedPlaylistsId: string[];
    handleSelected: (id: string) => void;
}

const PlaylistList = ({ playlists, selectedPlaylistsId, handleSelected }: PlaylistListProps) => {
    return (
        <>
            {playlists && playlists.length ? (
                <StyledListReset>
                    {playlists.map((playlist) => (
                        <PlaylistCard
                            playlist={playlist}
                            key={playlist.id}
                            selectedPlaylistsId={selectedPlaylistsId}
                            clickable={true}
                            handleSelected={handleSelected} />
                    ))}
                </StyledListReset>
            ) : (
                <p className="empty-notice">No Playlist available</p>
            )}
        </>
    );
}

export default PlaylistList;