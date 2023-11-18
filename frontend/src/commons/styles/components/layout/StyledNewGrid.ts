import styled from 'styled-components';

interface StyledNewtGridProps {
}

const StyledNewGrid = styled.div<StyledNewtGridProps>`
  margin: 15px 50px 0 50px;
  background: var(--new-black);


  display: grid;
  grid-template-columns: 500px auto;
  gap: 20px;

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