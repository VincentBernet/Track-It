import { Link } from "react-router-dom";
import styled from "styled-components";

const EditionHeader = () => {
	return (
		<StyledProfileHeader>
			<Link to="/">Edition</Link>
		</StyledProfileHeader>
	);
};

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

export default EditionHeader;
