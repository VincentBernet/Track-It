import './App.css';
import { useEffect, useState } from "react";
import { accessToken, getCurrentUserProfile } from "./commons/spotify";
import Profile from './commons/components/Profile';
import Login from './commons/components/Login';
import NotFound from './commons/components/NotFound';
import { apiMeResponse } from './commons/interface';


const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<apiMeResponse | null>(null);

  useEffect(() => {
    setToken(accessToken);
    if (!accessToken) return;

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      console.log("Calling https://api.spotify.com/v1/me endpoint, getting following response :", data);
      setProfile(data);
    }

    fetchData();
  }, [])

  if (!token) {
    return <Login />
  }

  if (token && profile) {
    return <Profile profile={profile} />
  }

  if (!token && !profile) {
    console.log("No token and no profile, token:", token, "profile:", profile, "returning NotFound component");
    return (<NotFound />);
  }
}

export default App;
