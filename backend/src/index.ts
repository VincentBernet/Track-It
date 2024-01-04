import axios from 'axios';
import express, { Express, Request, Response } from "express";
import querystring from 'querystring';
import { RequestParams, ResponseBody, RequestBody, RequestQuery } from './type';

require('dotenv').config();
const app: Express = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || port;
const stateKey = 'spotify_auth_state';

// app.METHOD(PATH, HANDLER);
console.log('ClientID: ', process.env.CLIENT_ID);

/**
 * Generate a random string containing numbers and letters
 * @param {number} length The length of the string
 * @returns {string} The generated string
 */
const generateRandomString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


app.get('/', (req: Request, res: Response) => {
    const data = {
        name: 'John',
        age: 30,
        city: 'New York'
    };
    res.json(data);
});

app.get('/login', (req: Request, res: Response) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-library-read',
        'user-library-modify',
        'playlist-modify-public',
        'playlist-modify-private'
    ].join(' ');

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then((response: { status: number; data: { access_token: any; refresh_token: any; expires_in: any; }; }) => {
            if (response.status === 200) {

                const { access_token, refresh_token, expires_in } = response.data;
                const queryParams = querystring.stringify({
                    access_token,
                    refresh_token,
                    expires_in
                });

                // redirect to react app
                res.redirect(`${FRONTEND_URI}/?${queryParams}`);
                // pass along tokens in query params
            } else {
                res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
            }

        })
        .catch((error: any) => {
            res.send(error);
        });
});

app.get('/refresh_token', (req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
        .then((response: { data: any; }) => {
            res.send(response.data);
        })
        .catch((error: any) => {
            res.send(error);
        });
});

app.listen(PORT, () => {
    console.log(`Express app listening at http://localhost:${PORT}`);
});
