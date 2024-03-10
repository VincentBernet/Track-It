import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { accessToken } from "./commons/spotify/auth";
import {
	EasyModification,
	ErrorPage,
	Login,
	Playlist,
	Playlists,
	Profile,
	TopArtists,
	TopTracks,
	Track,
} from "./features/pages";

const App = () => {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		setToken(accessToken);
		if (!accessToken) return;
	}, []);

	if (!token) {
		return <Login />;
	}

	if (token) {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<EasyModification />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/playlists/:id" element={<Playlist />} />
					<Route path="/playlists" element={<Playlists />} />
					<Route path="/track/:id" element={<Track />} />
					<Route path="/top-artists" element={<TopArtists />} />
					<Route path="/top-tracks" element={<TopTracks />} />

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		);
	}
};

export default App;
