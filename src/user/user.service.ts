import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PaginateModel } from 'mongoose-paginate';
import { User } from './interface/user.interface';
import { UserProviders } from './enums/user-providers.enum';
import { UserGateway } from './user.gateway';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserProviders.UserModelToken)
    private readonly userModel: PaginateModel<User>,
    private readonly gateway: UserGateway,
  ) {}
}
