import { profileDataType } from "../../spotify/responsesTypes";
import styled from "styled-components";
import { Link } from "react-router-dom";

type EasyModificationHeaderProps = {
    profile: profileDataType | null;
};


const EasyModificationHeader = ({ profile }: EasyModificationHeaderProps) => {
    if (!profile) {
        return null;
    }

    return (
        <StyledEasyModificationHeader>
            {profile.images.length && profile.images[0].url && (
                <Link to="/profile">
                    <img style={{ width: "50px" }} src={profile.images[0].url} alt="Avatar" />
                </Link>
            )}
            <Link to="/profile">{profile.display_name}</Link>
        </StyledEasyModificationHeader>
    );
}

const StyledEasyModificationHeader = styled.div`
    margin-left: var(--spacing-xl);
    padding-top: 15px;
    display: flex;
    align-items: center;
    
    img {
        border-radius: 50%;
        margin-right: var(--spacing-sm);
    }
    `;

export default EasyModificationHeader;