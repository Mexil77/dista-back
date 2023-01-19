import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  /**
   * Get all users
   * @return {User[]} A list of Users
   */
  @Get()
  findAll(): string {
    return 'All Users returned';
  }
}
