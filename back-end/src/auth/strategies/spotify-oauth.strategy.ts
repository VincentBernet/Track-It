import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-spotify';
import secretEnv from '../secret.env';

export class SpotifyOauthStrategy extends PassportStrategy(
    Strategy,
    'spotify',
) {
    constructor() {
        super(
            {
                clientID: secretEnv.client_id,
                clientSecret: secretEnv.client_secret,
                callbackURL: secretEnv.redirect_uri,
                scope:
                    'user-read-private user-read-email playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
            },
            (
                accessToken: string,
                refreshToken: string,
                expires_in: number,
                profile: Profile,
                done: VerifyCallback,
            ): void => {
                return done(null, profile, { accessToken, refreshToken, expires_in });
            },
        );
    }
}