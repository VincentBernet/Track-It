import { useEffect, useState } from "react";
import { accessToken, logout } from "./commons/spotify/auth";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Login, Profile } from './features/pages';
import { NotFound, LogoutButton } from './commons/components';

const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(accessToken);
    if (!accessToken) return;
  }, [])

  if (!token) {
    return <Login />
  }

  if (token) {
    return (
      <BrowserRouter>
        <LogoutButton logout={logout} />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
          <Route path="/playlists" element={<h1>Playlists</h1>} />
          <Route path="/top-artists" element={<h1>Top Artists</h1>} />
          <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (!token) {
    console.log("No token found, token:", token);
    return (<NotFound />);
  }
}

export default App;
