import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SpotifyOauthGuard } from './guards/spotify-oauth.guard';
import { Profile } from 'passport-spotify';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // UseGuards is a decorator that allows you to use a guard, to protect our login route
    @UseGuards(SpotifyOauthGuard)
    @Get('login')
    login(): void {
        return;
    }

    // This is the route that Spotify will redirect to after the user has logged in
    @UseGuards(SpotifyOauthGuard)
    @Get('redirect')
    async spotifyAuthRedirect(
        @Req() req: any,
        @Res() res: Response,
    ): Promise<Response> {
        const {
            user,
            authInfo,
        }: {
            user: Profile;
            authInfo: {
                accessToken: string;
                refreshToken: string;
                expires_in: number;
            };
        } = req;

        if (!user) {
            res.redirect('/');
            // return;
        }

        req.user = undefined;

        const jwt = this.authService.login(user);

        res.set('authorization', `Bearer ${jwt}`);

        return res.status(201).json({ authInfo, user });
    }
}