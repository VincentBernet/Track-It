import { useEffect, useState } from "react";
import { profileData } from "../../spotify/responsesTypes";
import { getCurrentUserProfile } from "../../spotify/requests";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const EasyModificationHeader = () => {
    const [profile, setProfile] = useState<profileData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getCurrentUserProfile();
                setProfile(userProfile.data);
            }
            catch (e) {
                console.log("Error fetching profile data :", e);
            }
        };

        fetchData();
    }, []);

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

export default EasyModificationHeader;