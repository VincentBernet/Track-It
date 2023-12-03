import { keyframes } from "styled-components";

export const fadeIn = keyframes`
    0% {opacity: 0;}
    25% {opacity: 0.25;}
    50% {opacity: 0.50;}
    75% {opacity: 0.75;}
    100% {opacity: 1;}
`;

export const fadeOut = keyframes`
    0% {opacity: 1;}
    25% {opacity: 0.75;}
    50% {opacity: 0.50;}
    75% {opacity: 0.25;}
    100% {opacity: 0;}
`;
