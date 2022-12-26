const client_id = '7a9b546cc64c47c99a024b3f3b301bfa'; // Client ID of TrackIt app
const client_secret = 'a2b75d769b3a4dceba515dffaa03a762'; // Client secret of TrackIt app
const redirect_uri = 'https://croissanterie.netlify.app/'; // Where to redirect after login
// Check https://developer.spotify.com/dashboard/applications

const secretEnv = {
    client_id,
    client_secret,
    redirect_uri,
};

export default secretEnv;
