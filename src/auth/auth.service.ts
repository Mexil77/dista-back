import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { AccessTocken } from 'src/token/interface/access-token.interface';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Sign up user.
   * @param {SignUpDto} signUpDto
   * @return {Promise<SignUpReturnValue>}
   **/
  public async signUp(signUpDto: SignUpDto, req: Request) {}
}
