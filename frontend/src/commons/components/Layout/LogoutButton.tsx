
import React from 'react';
import styled from 'styled-components';


interface LogoutButtonProps {
  logout: () => void;
  bodyColor?: string;
}

const LogoutButton = React.memo(({ logout, bodyColor = "#121212" }: LogoutButtonProps) => {
  document.body.style.backgroundColor = bodyColor;
  return (
    <StyledAbsoluteLogoutButton onClick={logout}>
      Log Out
    </StyledAbsoluteLogoutButton>
  );
});

const StyledAbsoluteLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-xl);
  }
`;

export default LogoutButton;
