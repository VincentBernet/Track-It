import { Artwork } from "./index";
import { EyeSvg } from "./icons";
import { StyledPlaylistCard } from "../styles";


type LikeSongCardProps = {
    handleVisiblePlaylist: (playlistId?: string, playlistName?: string) => void;
};

const LikeSongCard = ({ handleVisiblePlaylist }: LikeSongCardProps) => {

    return (
        <StyledPlaylistCard $selected={false} $clickable={true} onClick={() => handleVisiblePlaylist()}>
            <div>
                <Artwork
                    images={[{
                        url: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
                        height: 640,
                        width: 640,
                    }]}
                    size={"40px"}
                    alt={"Liked music"}
                />
                <span className={'playlistName'}>
                    Liked Songs
                </span>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <button className="button-ahead visibleOnHover noPadding">
                    <EyeSvg />
                </button>
            </div>
        </StyledPlaylistCard>
    )
};

export default LikeSongCard;