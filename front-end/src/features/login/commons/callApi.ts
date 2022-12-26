import { playlistListType } from './interface';

export const getAllPlaylist = async (): Promise<playlistListType> => {
	let json: playlistListType = [{name: 'Initialisation'}];
	console.log('Appel du back via la fonctione getAllPlaylist');
	try {
		const endpointUrl = 'https://own-proxy-cors.herokuapp.com/https://track-it-spotify.herokuapp.com/playlist/accessAll';
		await fetch(endpointUrl).then((response) => response
			.json()
			.then((data) => ({
				data,
				status: response.status,
			}))
			.then((res) => {
				json = res.data;
			}));
	} catch (error) {
		console.log(`We got some error with the api call chef: ${error}`);
		json = [{name: `We got some error with the api call chef: ${error}`}];
	}
	return json;
};