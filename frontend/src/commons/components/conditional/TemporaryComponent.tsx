import { useEffect } from "react";


type NotificationProps = {
    children: React.ReactNode;
    timeBeforeDeletion?: number;
    handleOnDelete: () => void;
};

const TemporaryComponent = ({ children, timeBeforeDeletion = 8000, handleOnDelete }: NotificationProps) => {
    useEffect(() => {
        const timeoutId = setTimeout(() => handleOnDelete(), timeBeforeDeletion);
        timeoutId;
    }, [handleOnDelete, timeBeforeDeletion]);

    return (
        <>
            {children}
        </>
    );
};

export default TemporaryComponent;