import { playlist } from "../spotify/responsesTypes";
import { StyledPlaylistCard } from "../styles";

interface PlaylistCardProps {
    playlist: playlist,
    selectedPlaylistsId: string[],
    handleSelected: (id: string) => void,
    clickable?: boolean,
}

const PlaylistCard = ({ playlist, selectedPlaylistsId, clickable, handleSelected }: PlaylistCardProps) => {
    const isSelected = selectedPlaylistsId.includes(playlist.id);
    return (
        <StyledPlaylistCard selected={isSelected} clickable={clickable !== undefined ? "clickable" : ""}
            onClick={() => clickable !== undefined && handleSelected(playlist.id)}>
            {playlist.images.length && playlist.images[0] ? (
                <img className={'playlistImage'} src={playlist.images[0].url} alt={playlist.name} />
            ) : <img className={'playlistImage'} src={'/images/default_image.png'} alt={playlist.name} />
            }
            <span className={'playlistName'}>
                {playlist.name}
            </span>
        </StyledPlaylistCard>
    )
};

export default PlaylistCard;