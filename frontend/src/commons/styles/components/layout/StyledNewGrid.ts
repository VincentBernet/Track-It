import styled from "styled-components";

interface StyledNewtGridProps {
	$hasMoreMargin?: boolean;
}

const StyledNewGrid = styled.div<StyledNewtGridProps>`
  margin-top: ${(props) => (props.$hasMoreMargin ? "61px" : "15px")};
  background: var(--true-black);


  display: grid;
  grid-template-columns: 25% auto;
  gap: 20px;

  @media (max-width: 1280px) {
    margin: 15px 0 0 20;
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
