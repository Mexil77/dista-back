import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserStatusEnum } from 'src/user/enums/user-status.enum';
import { UserService } from 'src/user/user.service';
import { AuthConstants } from '../constants/auth.constatns';
import { TokenRequirements } from '../decorators/tocken-requirements.decorator';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (
      req.headers.authorization &&
      (req.headers.authorization as string).split(' ')[0] === 'Dragon'
    ) {
      const token = (req.headers.authorization as string).split(' ')[1];
      console.log(token);

      let decodeToken;
      try {
        decodeToken = jwt.verify(
          token,
          AuthConstants.cert.privateKey,
        ) as AccessTocken;
      } catch (err) {
        throw new UnauthorizedException({
          message: 'Token Expire',
        });
      }

      req.user = decodeToken;
      return true;
    }
    return false;
  }
}
