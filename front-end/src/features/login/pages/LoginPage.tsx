import React, { useState } from 'react';
import { getAllPlaylist, getAuthentification } from '../commons/callApi';

const LoginPage = (): React.ReactElement => {
	const [playlistList, setPlaylistList] = useState([{name: 'test'},]);
	const [showPlaylistList, setShowPlaylistList] = useState(false);

	async function onClickLogin() {
		// const data = await getAllPlaylist();
		const data = await getAuthentification();
		setPlaylistList(data);
		setShowPlaylistList(true);
	}
  
	return (
		<>
			<div>
				<h1>Track It</h1>
				<p>
					<span>Your interface to organize your music, currently supporting only Spotify</span> <br/>
					<span>A project by Romain Jouffreau and Vincent Bernet</span>
				</p>
				<button onClick={onClickLogin}>LOG IN WITH SPOTIFY</button>
			</div>

			{/*showPlaylistList && <div>{playlistList.map(playlist => playlist.name + ' | ')}</div>*/}
		</>
	);
};

export default LoginPage;	