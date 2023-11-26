import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledProfileHeader = styled.div`
    display: flex;
    margin-left: var(--spacing-md);
    align-items: center;
    margin-bottom: var(--spacing-md);
    
    img {
        border-radius: 50%;
        margin-right: var(--spacing-sm);
    }
    `;

const EditionHeader = () => {
    return (
        <StyledProfileHeader>
            <Link to="/">Edition</Link>
        </StyledProfileHeader>
    );
}

export default EditionHeader;