import { useEffect } from "react";
import { StyledAnimatedIcone } from "../styles";

const NotificationIcone = ({ displayNotification, idPlaylist, handleOnDelete }: { displayNotification: boolean, idPlaylist: string, handleOnDelete: (idPlaylist: string) => void }) => {

    useEffect(() => {
        if (displayNotification) {
            const timeoutId = setTimeout(() => handleOnDelete(idPlaylist), 2000);
            console.log('useEffect NotificationIcone : for the following playlist', idPlaylist);
            timeoutId;
        }
    }, [handleOnDelete]);


    if (!displayNotification) {
        return (null);
    }
    return (
        <StyledAnimatedIcone src={"./images/check.png"} alt={"check"} />);
};

export default NotificationIcone;