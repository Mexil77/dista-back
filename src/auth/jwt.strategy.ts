import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConstants } from 'src/common/constants/auth.constatns';
@Injectable()
export class JwtStratedy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreDue: false,
      secretOrKey: AuthConstants.cert.privateKey,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
