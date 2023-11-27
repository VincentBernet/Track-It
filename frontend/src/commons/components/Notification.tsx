import styled from "styled-components";


type NotificationProps = {
    message: string;
    status: string;
};

const Notification = ({ message, status }: NotificationProps) => {
    return (
        <StyledNotification status={status}>
            {message}
        </StyledNotification>)
}

type StyledNotificationProps = {
    status: string;
};

const StyledNotification = styled.div<StyledNotificationProps>`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background: ${props => props.status === "error" ? "red" : "green"};
    color: white;
    font-weight: bold;
    text-align: center;
    z-index: 100;
`;

export default Notification;