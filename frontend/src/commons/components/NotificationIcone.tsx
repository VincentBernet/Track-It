import { useEffect, useState } from "react";

const NotificationIcone = ({ displayNotification }: { displayNotification: boolean }) => {
    const [isVisible, setIsVisible] = useState(displayNotification);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(!displayNotification);
        }, 2000);
    }, [displayNotification]);

    if (!isVisible) {
        return (null);
    }
    return (<span>Added</span>);
};

export default NotificationIcone;