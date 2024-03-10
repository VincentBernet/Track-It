import styled from "styled-components";

interface StyledDropdownOldProps {
	$activeOption: boolean;
}

const StyledDropdownOld = styled.div<StyledDropdownOldProps>`
  z-index: 1;

  @media (min-width: 768px) {
    right: var(--spacing-xxl);
  }

  &:after {
    content: '';
    top: 14px;
    right: var(--spacing-sm);
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid var(--white);
  }

  select {
    -webkit-appearance: none;
    appearance: none;
    background-color: ${(props) => (props.$activeOption ? "rgba(255,255,255,0.1)" : "transparent")};
    color: white;
    border: 0;
    border-radius: var(--border-radius-subtle);
    font-size: var(--fz-sm);
    font-family: inherit;
    padding: var(--spacing-xs) var(--spacing-xl) var(--spacing-xs) var(--spacing-sm);
  }

  option {
    background-color: var(--black);
    color: var(--white);
  }
`;

export default StyledDropdownOld;
