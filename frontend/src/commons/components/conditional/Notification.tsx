import styled, { keyframes } from "styled-components";
import { fadeIn, fadeOut } from "../../styles/global/animation";


type NotificationProps = {
    message: string;
    status: string;
};

const Notification = ({ message, status }: NotificationProps) => {
    return (
        <StyledNotification $status={status}>
            {message}
        </StyledNotification>)
}

type StyledNotificationProps = {
    $status: string;
};

export const slideIn = keyframes`
    0% { transform: translateX(-100%); }
    25% { transform: translateX(-75%); }
    50% { transform: translateX(-50%); }
    75% { transform: translateX(-25%); }
    100% { transform: translateX(0); }
`;

export const slideOut = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(25%); }
    50% { transform: translateX(50%); }
    75% { transform: translateX(75%);}
    100% { transform: translateX(100%);}
`;

const StyledNotification = styled.div<StyledNotificationProps>`
    animation: 
        ${slideIn} 300ms 0ms 1 linear,
        ${fadeIn} 300ms 0ms 1 linear,
        ${slideOut} 500ms 7600ms 1 linear,
        ${fadeOut} 500ms 7600ms 1 linear
    ;
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background: ${props => props.$status === 'error' ? 'var(--red)' : 'var(--green)'};
    /*border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;*/
    color: white;
    font-weight: bold;
    text-align: center;
    z-index: 100;
`;

export default Notification;