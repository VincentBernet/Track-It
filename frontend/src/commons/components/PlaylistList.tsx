import { PlaylistCard } from "./index";
import { playlist } from "../spotify/responsesTypes";
import { StyledListReset } from "../styles";

interface PlaylistListProps {
    playlists: playlist[];
    selectedPlaylistsId: string[];
    playlistAdditionSuccess: string[];
    handleSelected: (id: string) => void;
    handleOnDelete: () => void;
    consultationMode?: boolean;
}

const PlaylistList = ({ playlists, selectedPlaylistsId, playlistAdditionSuccess, consultationMode, handleSelected, handleOnDelete }: PlaylistListProps) => {
    return (
        <>
            {playlists && playlists.length ? (
                <StyledListReset>
                    {playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            clickable
                            consultationMode={consultationMode}
                            isSelected={selectedPlaylistsId.includes(playlist.id)}
                            displayNotification={playlistAdditionSuccess.includes(playlist.id)}
                            handleOnDelete={handleOnDelete}
                            handleSelected={handleSelected}
                        />
                    ))}
                </StyledListReset>
            ) : (
                <p className="empty-notice">No Playlist available</p>
            )}
        </>
    );
}

export default PlaylistList;