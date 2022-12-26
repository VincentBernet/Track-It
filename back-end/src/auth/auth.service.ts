import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-spotify';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: Profile) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }
}
