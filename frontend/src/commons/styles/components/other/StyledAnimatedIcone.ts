import styled from 'styled-components';

interface StyledAnimatedIconeProps {
}

const StyledAnimatedIcone = styled.img<StyledAnimatedIconeProps>`
    width: 30px;
    margin-left: 10px;
    object-fit: cover;
    border-radius: 50%;
    animation: rotate 2s linear infinite;
    
    @keyframes rotate {
        100% {
        transform: rotate(360deg);
        }
    }
`;

export default StyledAnimatedIcone;
