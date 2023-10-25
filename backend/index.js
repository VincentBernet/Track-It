require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const stateKey = 'spotify_auth_state';

// app.METHOD(PATH, HANDLER);
console.log('ClientID: ', process.env.CLIENT_ID);

/**
 * Generate a random string containing numbers and letters
 * @param {number} length The length of the string
 * @returns {string} The generated string
 */
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


app.get('/', (req, res) => {
    const data = {
        name: 'John',
        age: 30,
        city: 'New York'
    };
    res.json(data);
});

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    const scope = "user-read-private user-read-email";

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req, res) => {
    res.send('You are logined !');
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
