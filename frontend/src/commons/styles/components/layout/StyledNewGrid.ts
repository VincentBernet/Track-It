import styled from 'styled-components';

interface StyledNewtGridProps {
  $hasMoreMargin: boolean;
}

const StyledNewGrid = styled.div<StyledNewtGridProps>`
  margin: ${props => props.$hasMoreMargin ? "161px 50px 0 50px" : "15px 50px 0 50px"};
  background: var(--new-black);


  display: grid;
  grid-template-columns: 25% auto;
  gap: 20px;

  @media (max-width: 1280px) {
    margin: 15px 25px 0 25px;
    grid-template-columns: 100%;
  }

  aside{
    padding: 30px 30px 30px 30px;
    background: var(--new-light-grey);
    border-radius: 15px;
  }

  section {
    padding: 30px 30px 30px 30px;
    background: var(--new-light-grey);
    border-radius: 15px;
  }
`;

export default StyledNewGrid;