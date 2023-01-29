import {
  Controller,
  UseFilters,
  Body,
  Req,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenRequirements } from 'src/common/decorators/tocken-requirements.decorator';
import { Token } from 'src/common/decorators/token.decorator';
import { TokenGuard } from 'src/common/guards/token.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { User } from 'src/user/interface/user.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenTypeEnums } from 'src/token/enums/token-type.enums';
import { AccessTocken } from 'src/token/interface/access-token.interface';
import { SignInReturnValue } from './interface/signin-returnvalue.interface';
import { SignInDto } from './dto/sign-in.dto';

@Controller('api/auth')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(): string {
    return 'All Users returned';
  }
  /**
   * Sign up user.
   * @param {SignUpDto} signUpDto
   * @return {Promise<SignUpReturnValue>}
   **/
  @Post('signup')
  async signUp(@Body() SignUpDto: SignUpDto, @Req() request): Promise<User> {
    return await this.authService.signUp(SignUpDto, request);
  }

  /**
   * Sign in user via email
   * @param {SignInDto} SignInDto SignInDto object type
   * @return {Promise<SignInReturnValue>} A promise resolving in the sign in retrn value
   */
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInReturnValue> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/verify-email')
  @TokenRequirements([TokenTypeEnums.email])
  @UseGuards(TokenGuard)
  async verifyUser(@Token() token: AccessTocken): Promise<SignInReturnValue> {
    return await this.authService.verifyUser(token);
  }
}
