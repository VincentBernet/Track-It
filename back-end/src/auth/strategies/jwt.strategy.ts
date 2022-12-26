import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import secretEnv from '../secret.env';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretEnv.client_secret,
    });
  }

  async validate(payload: {
    name: string;
    sub: string;
  }): Promise<{ name: string; sub: string }> {
    return payload;
  }
}