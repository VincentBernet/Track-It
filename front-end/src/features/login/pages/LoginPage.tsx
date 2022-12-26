import React, { useState } from 'react';
import { getAllPlaylist } from '../commons/callApi';

const LoginPage = (): React.ReactElement => {
	const [playlistList, setPlaylistList] = useState([{name: 'test'},]);
	const [showPlaylistList, setShowPlaylistList] = useState(false);

	async function onClickLogin() {
		const data = await getAllPlaylist();
		setPlaylistList(data);
		setShowPlaylistList(true);
	}
  
	return (
		<>
			<p>Track It</p>
			<p>Your interface to organize your music, currently supporting only Spotify</p>
			<p>A project by Romain Jouffreau and Vincent Bernet</p>
			<button onClick={onClickLogin}>LOG IN WITH SPOTIFY</button>
			{showPlaylistList ? (
				<div>{playlistList[0].name}</div>
			) : (
				<div>Do not showPlaylistList</div>
			)}
		</>
	);
};

export default LoginPage;	