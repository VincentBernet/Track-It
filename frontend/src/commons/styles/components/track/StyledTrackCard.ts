import styled from 'styled-components';

interface StyledTrackCardProps {
  $selected: boolean;
  $clickable: boolean;
}

const StyledTrackCard = styled.li<StyledTrackCardProps>`
  display: grid;
  align-items: center;
  grid-template-columns: 20px 1fr;
  grid-gap: var(--spacing-md);
  padding: var(--spacing-xs);
  color: var(--light-grey);
  font-size: var(--fz-sm);
  border: ${props => props.$selected ? `1px solid var(--green)` : '1px solid transparent'};
  border-radius: var(--border-radius-subtle);
  transition: background-color 0.3s ease;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  @media (min-width: 768px) {
    grid-template-columns: 20px 4fr 2fr minmax(60px, 1fr);
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  @media (min-width: 1280px) {
    grid-template-columns: 20px 2fr 2fr 1fr minmax(60px, 1fr);
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  &:hover,
  &:focus {
    background-color: var(--dark-grey);
  }

.track__item__num {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: var(--fz-md);
  font-variant-numeric: tabular-nums;
  overflow: visible;
}

.track__item__title-group {
  display: flex;
  align-items: center;
}

.track__item__img {
  margin-right: var(--spacing-sm);
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: var(--dark-grey);
}

.track__item__name {
  color: var(--white);
  font-size: var(--fz-md);
}

.track__item__album {
  display: none;

  @media (min-width: 768px) {
    display: block;
    white-space: nowrap;
  }
}

.track__item__popularity {
  display: none;

  @media (min-width: 1280px) {
    display: block;
    white-space: nowrap;
  }
}

.track__item__duration {
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    font-variant-numeric: tabular-nums;
  }
}

`;

export default StyledTrackCard;