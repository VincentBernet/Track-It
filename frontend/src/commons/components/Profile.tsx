
import { logout } from '../spotify';
import { apiMeResponse } from '../interface';

interface ProfileProps {
    profile: apiMeResponse;
}

const Profile = ({ profile }: ProfileProps) => {
    return (
        <>
            <h1>Track-It</h1>
            <img src={profile.images[0].url} alt="Profile Avatar" />
            <h2>Hello {profile.display_name} !</h2>
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default Profile;