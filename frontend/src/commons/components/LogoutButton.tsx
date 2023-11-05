
import styled from 'styled-components';

interface LogoutButtonProps {
    logout: () => void;
}

const LogoutButton = ({ logout }: LogoutButtonProps) => {
    return (<StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>);
}

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

export default LogoutButton;
