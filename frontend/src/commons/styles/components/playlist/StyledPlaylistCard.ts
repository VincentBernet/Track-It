import styled from 'styled-components';

interface StyledPlaylistCardProps {
    selected: boolean;
    clickable: string;
}

const StyledPlaylistCard = styled.li<StyledPlaylistCardProps>`
    border: ${props => props.selected ? `1px solid var(--green)` : '1px solid transparent'};
    cursor: ${props => props.clickable === "clickable" ? 'pointer' : 'default'};
    border-radius: var(border-radius-pill);
    width: 250px;

    &:hover,
    &:focus {
        background-color: var(--dark-grey);
    }

    .playlistImage {
        width: 50px;
    }

    .playlistName {
        margin-left: var(--spacing-sm);
    }
`;

export default StyledPlaylistCard;