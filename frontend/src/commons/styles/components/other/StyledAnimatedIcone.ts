import styled from "styled-components";
import { fadeOut, jumpShaking } from "../../global/animation";

const StyledAnimatedIcone = styled.img`
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
