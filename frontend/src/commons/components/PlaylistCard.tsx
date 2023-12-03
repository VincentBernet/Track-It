import { useNavigate } from "react-router";
import { Artwork, TemporaryComponent } from "./index";
import { playlist } from "../spotify/responsesTypes";
import { StyledAnimatedIcone, StyledPlaylistCard } from "../styles";


interface PlaylistCardProps {
    playlist: playlist,
    handleOnDelete: () => void;
    consultationMode?: boolean,
    clickable?: boolean,
    isSelected?: boolean,
    displayNotification?: boolean,
    handleSelected?: (id: string) => void,
}

const PlaylistCard = (
    {
        playlist,
        handleOnDelete,
        isSelected = false,
        clickable = false,
        displayNotification = false,
        consultationMode = true,
        handleSelected = () => { }
    }: PlaylistCardProps) => {

    const navigate = useNavigate();
    return (
        <StyledPlaylistCard
            $selected={isSelected}
            $clickable={clickable}
            onClick={() => clickable && (
                !consultationMode ? handleSelected(playlist.id)
                    : navigate(`/playlists/${playlist.id}`)
            )}
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
            <div>
                {displayNotification &&
                    <TemporaryComponent handleOnDelete={handleOnDelete}>
                        <StyledAnimatedIcone src={"./images/check.png"} alt={"check"} />
                    </TemporaryComponent>
                }
            </div>
        </StyledPlaylistCard>
    )
};

export default PlaylistCard;