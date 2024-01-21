import { Artwork, TemporaryComponent } from "../index";
import { playlistType } from "../../spotify/responsesTypes";
import { StyledAnimatedIcone, StyledPlaylistCard } from "../../styles";
import { EyeSvg } from "../icons";


interface PlaylistCardProps {
    playlist: playlistType,
    handleOnDelete: () => void;
    clickable?: boolean,
    isSelected?: boolean,
    displayNotification?: boolean,
    handleSelected?: ({ playlistId, playlistName }: { playlistId: string, playlistName: string }) => void;
    handleVisiblePlaylist?: (playlistId: string, playlistName: string) => void;
}

const PlaylistCard = (
    {
        playlist,
        handleOnDelete,
        isSelected = false,
        clickable = false,
        displayNotification = false,
        handleSelected = () => { },
        handleVisiblePlaylist = () => { }
    }: PlaylistCardProps) => {

    return (
        <StyledPlaylistCard
            $selected={isSelected}
            $clickable={clickable}
            onClick={() => clickable && handleSelected({ playlistId: playlist.id, playlistName: playlist.name })}
        >
            <div>
                <Artwork
                    images={playlist.images}
                    size={"40px"}
                    alt={playlist.name}
                />
                <span className={'playlistName'}>
                    {playlist.name}
                </span>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {displayNotification &&
                    <TemporaryComponent handleOnDelete={handleOnDelete}>
                        <StyledAnimatedIcone src={"./images/check.png"} alt={"check"} />
                    </TemporaryComponent>
                }
                <button className="button-ahead visibleOnHover noPadding" onClick={(e) => {
                    e.stopPropagation();
                    handleVisiblePlaylist(playlist.id, playlist.name);
                }}>
                    <EyeSvg />
                </button>
            </div>
        </StyledPlaylistCard>
    )
};

export default PlaylistCard;