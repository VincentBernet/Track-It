import styled, { keyframes } from 'styled-components';
import { fadeOut } from '../../global/animation';

interface StyledAnimatedIconeProps {
}

const jumpShaking = keyframes`
    0% { transform: translateX(0) }
    25% { transform: translateY(-3px) }
    35% { transform: translateY(-3px) rotate(17deg) }
    55% { transform: translateY(-3px) rotate(-17deg) }
    65% { transform: translateY(-3px) rotate(17deg) }
    75% { transform: translateY(-3px) rotate(-17deg) }
    100% { transform: translateY(0) rotate(0) }
`;

const StyledAnimatedIcone = styled.img<StyledAnimatedIconeProps>`
    width: 30px;
    margin-left: 20px;
    object-fit: cover;
    border-radius: 50%;
    animation: 
        ${jumpShaking} 1000ms 500ms 3 normal,
        ${jumpShaking} 1000ms 4500ms 3 normal,
        ${fadeOut} 600ms 7500ms 1 linear
    ;
`;

export default StyledAnimatedIcone;
