import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { UserStatusEnum } from 'src/user/enums/user-status.enum';
import { User } from 'src/user/interface/user.interface';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInReturnValue } from './dto/interface/signin-returnvalue.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Sign up user.
   * @param {SignUpDto} signUpDto
   * @return {Promise<SignUpReturnValue>}
   **/
  public async signUp(signUpDto: SignUpDto, req: Request): Promise<User> {
    //Stepts Omited:
    //-Find User in Db to avoid duplicate.
    //-Trow a BadRequest

    const dbUser = await this.userService.signUp(signUpDto, req);
    const accessToken = this.createAccessTokenFromUserEmail(
      dbUser,
      TokenTypeEnums.email,
      '24h',
    );
    console.log(accessToken);
    return dbUser;
  }

  async verifyUser(token: AccessTocken): Promise<SignInReturnValue> {
    const dbUser = await this.userService.findOneByEmail(token.sub);
    const accessToken = this.createAccessTokenFromUser(dbUser);
    const returnValue: SignInReturnValue = {
      accessToken,
      user: dbUser,
    };
    return returnValue;
  }

  /* Create Tockens Methods */

  public createAccessTokenFromUser(user: User): string {
    const payload: AccessTocken = {
      uid: user._id,
      type: TokenTypeEnums.user,
      sub: user.email,
    };
    return this.jwtService.sign(payload, { expiresIn: '1y' });
  }

  public createAccessTokenFromUserEmail(
    user: User,
    tokenType,
    expiresIn,
  ): string {
    const payload: AccessTocken = {
      uid: user._id,
      type: tokenType,
      sub: user.email,
    };
    const timeExpires = expiresIn;
    return this.jwtService.sign(payload, { expiresIn: timeExpires });
  }
}
