import styled from "styled-components";

type StyledPlaylistCardProps = {
	$selected: boolean;
	$clickable: boolean;
};

const StyledPlaylistCard = styled.li<StyledPlaylistCardProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: ${(props) => (props.$selected ? "1px solid var(--green)" : "1px solid transparent")};
    cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
    border-radius: var(--border-radius-subtle);
    padding: var(--spacing-xs);
    width: 100%;

    &:hover,
    &:focus {
        background-color: var(--dark-grey);
        .visibleOnHover {
                visibility: visible;
        }
    }

    .playlistName {
        margin-left: var(--spacing-sm);
    }
`;

export default StyledPlaylistCard;
