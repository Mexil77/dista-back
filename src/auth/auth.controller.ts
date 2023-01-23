import { Controller, UseFilters, Body, Req, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exeption.filter';
import { User } from 'src/user/interface/user.interface';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('api/auth')
@UseFilters(HttpExceptionFilter, MongoExceptionFilter)
export class AuthControlle {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up user.
   * @param {SignUpDto} signUpDto
   * @return {Promise<SignUpReturnValue>}
   **/
  @Post('signup')
  async signUp(@Body() SignUpDto: SignUpDto, @Req() request): Promise<User> {
    return await this.authService.signUp(SignUpDto, request);
  }
}
