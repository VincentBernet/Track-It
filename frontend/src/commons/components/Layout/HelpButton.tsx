
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalTutorial } from '../index';
import { QuestionMarkCircleSvg } from '../Icon';


const HelpButton = React.memo(() => {
  /* Modal state : For displaying tutorial modal on first render */
  const [isModalTutorialOpen, setIsModalTutorialOpen] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("tutorial") !== "true") {
      setIsModalTutorialOpen(true);
      localStorage.setItem("tutorial", "true");
    }
  }, []);

  return (
    <>
      <StyledAbsoluteHelpButton onClick={() => { setIsModalTutorialOpen(true) }} aria-label={'Need help ? Open tutorial'}>
        <QuestionMarkCircleSvg />
      </StyledAbsoluteHelpButton>
      {isModalTutorialOpen && <ModalTutorial onClose={() => setIsModalTutorialOpen(false)} />}
    </>
  );
});

const StyledAbsoluteHelpButton = styled.button`
  position: absolute;
  top: 17px;
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: 115px;
  }
`;

export default HelpButton;
