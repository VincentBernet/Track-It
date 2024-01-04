import styled from "styled-components";
import { horizontalShaking } from "../../global/animation";

const StyledGreenButton = styled.button`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }

  &[disabled] {
    animation: 
        ${horizontalShaking} 8000ms 2500ms infinite normal
    ;  }
`;

export default StyledGreenButton;