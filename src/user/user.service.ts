import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PaginateModel } from 'mongoose-paginate';
import { User } from './interface/user.interface';
import { UserProviders } from './enums/user-providers.enum';
import { UserGateway } from './user.gateway';
import { UserRoleEnum } from './enums/user-role.enum';
import { UserLenguageEnum } from './enums/user-lenguage.enum';
import { ModulesKeyByRole } from './enums/modules-key.enum';
import { UserStatusEnum } from './enums/user-status.enum';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { AuthConstants } from 'src/common/constants/auth.constatns';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserProviders.UserModelToken)
    private readonly userModel: PaginateModel<User>,
    private readonly gateway: UserGateway,
  ) {}

  /**
   * Create a new User in SignUp
   * @param signUpDto
   * @param req
   * @return {User}
   */
  public async signUp(signUpDto: SignUpDto, req: any): Promise<User> {
    const permission: any = ModulesKeyByRole.filter(
      (m) => m.role === UserRoleEnum.user,
    ).map((m) => m.modules.map((m) => m))[0];

    const createdUser = new this.userModel({
      ...signUpDto,
      permission,
      status: UserStatusEnum.active,
      lenguage: UserLenguageEnum.es,
      lastLogin: new Date(),
    });

    return createdUser.save();
  }

  /**
   * Get a single user by email.
   * @param {string} email - Users email.
   * @return {User} User returned.
   */
  public async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }, ['+password']);
  }

  public async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return (await AuthConstants.encryptor.decrypt(user.password)) === password;
  }
}
