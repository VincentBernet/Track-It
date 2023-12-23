import styled from 'styled-components';

interface StyledDropdownProps {
  $isProperties?: boolean;
}

const StyledDropdown = styled.div<StyledDropdownProps>`
  position: absolute; 
  margin-top: ${props => props.$isProperties ? '365px' : '288px'};
  margin-right: ${props => props.$isProperties ? '0' : '100px'};
  padding: 15px; 
  border-radius: 8px;
  z-index: 2;
  background-color: var(--true-black);
`;

export default StyledDropdown;
